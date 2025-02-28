import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
	let service: AuthService;
	let usersService: UsersService;
	let jwtService: JwtService;
	let userModel: Model<User>;

	const mockUser = {
		_id: 'user-id',
		email: 'test@example.com',
		name: 'Test User',
		password: 'hashedPassword',
	};

	const mockUserModel = {
		findById: jest.fn(),
		findOne: jest.fn(),
		insertOne: jest.fn(),
	};

	const mockUsersService = {
		findByEmail: jest.fn(),
		findById: jest.fn(),
	};

	const mockJwtService = {
		signAsync: jest.fn(),
	};

	beforeEach(async () => {
		jest.clearAllMocks();

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
				{
					provide: JwtService,
					useValue: mockJwtService,
				},
				{
					provide: getModelToken(User.name),
					useValue: mockUserModel,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		usersService = module.get<UsersService>(UsersService);
		jwtService = module.get<JwtService>(JwtService);
		userModel = module.get<Model<User>>(getModelToken(User.name));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('register', () => {
		const registerDto = {
			email: 'test@example.com',
			name: 'Test User',
			password: 'Password1!',
		};

		it('should throw ConflictException if user already exists', async () => {
			mockUsersService.findByEmail.mockResolvedValue(mockUser);

			await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
			expect(mockUsersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
		});

		it('should register a new user successfully', async () => {
			mockUsersService.findByEmail.mockResolvedValue(null);

			(bcrypt.hash as jest.Mock).mockImplementation(() => Promise.resolve('hashedPassword'));

			mockUserModel.insertOne.mockResolvedValue({
				_id: 'user-id',
				name: registerDto.name,
				email: registerDto.email,
				password: 'hashedPassword',
			});
			mockUsersService.findById.mockResolvedValue({ ...mockUser, password: undefined });
			mockJwtService.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');

			const result = await service.register(registerDto);

			expect(mockUsersService.findByEmail).toHaveBeenCalledWith(registerDto.email);

			expect(mockUserModel.insertOne).toHaveBeenCalledWith({
				name: registerDto.name,
				email: registerDto.email.toLowerCase(),
				password: 'hashedPassword',
			});
			expect(mockUsersService.findById).toHaveBeenCalledWith('user-id', { hidePassword: true });
			expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
			expect(result).toEqual({
				user: { ...mockUser, password: undefined },
				accessToken: 'access-token',
				refreshToken: 'refresh-token',
			});
		});
	});

	describe('login', () => {
		const loginDto = {
			email: 'test@example.com',
			password: 'Password1!',
		};

		it('should throw UnauthorizedException if user does not exist', async () => {
			mockUsersService.findByEmail.mockResolvedValue(null);

			await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
			expect(mockUsersService.findByEmail).toHaveBeenCalledWith(loginDto.email);
		});

		it('should throw UnauthorizedException if password is invalid', async () => {
			mockUsersService.findByEmail.mockResolvedValue(mockUser);
			(bcrypt.compare as jest.Mock).mockResolvedValue(false);

			await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
			expect(mockUsersService.findByEmail).toHaveBeenCalledWith(loginDto.email);
			expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
		});

		it('should login successfully with valid credentials', async () => {
			mockUsersService.findByEmail.mockResolvedValue(mockUser);
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);
			mockUsersService.findById.mockResolvedValue({ ...mockUser, password: undefined });
			mockJwtService.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');

			const result = await service.login(loginDto);

			expect(mockUsersService.findByEmail).toHaveBeenCalledWith(loginDto.email);
			expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
			expect(mockUsersService.findById).toHaveBeenCalledWith(mockUser._id, { hidePassword: true });
			expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
			expect(result).toEqual({
				user: { ...mockUser, password: undefined },
				accessToken: 'access-token',
				refreshToken: 'refresh-token',
			});
		});
	});

	describe('createAuthTokens', () => {
		it('should create access and refresh tokens', async () => {
			mockJwtService.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');

			const result = await service.createAuthTokens(mockUser as any);

			expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
			expect(mockJwtService.signAsync).toHaveBeenCalledWith(
				{ sub: mockUser._id, email: mockUser.email },
				{ expiresIn: '1h' },
			);
			expect(mockJwtService.signAsync).toHaveBeenCalledWith(
				{ sub: mockUser._id, email: mockUser.email },
				{ expiresIn: '7d' },
			);
			expect(result).toEqual({
				accessToken: 'access-token',
				refreshToken: 'refresh-token',
			});
		});
	});
});
