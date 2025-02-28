import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthContext } from './auth.context';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
	let controller: AuthController;
	let authService: AuthService;
	let authContext: AuthContext;
	let usersService: UsersService;

	const mockUser = {
		_id: 'user-id',
		email: 'test@example.com',
		name: 'Test User',
	};

	const mockAuthService = {
		register: jest.fn(),
		login: jest.fn(),
	};

	const mockAuthContext = {
		getUser: jest.fn(),
		setUser: jest.fn(),
	};

	const mockUsersService = {
		findById: jest.fn(),
	};

	const mockJwtService = {
		verifyAsync: jest.fn(),
	};

	const mockConfigService = {
		getOrThrow: jest.fn(),
	};

	beforeEach(async () => {
		jest.clearAllMocks();

		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
				{
					provide: AuthContext,
					useValue: mockAuthContext,
				},
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
				{
					provide: JwtService,
					useValue: mockJwtService,
				},
				{
					provide: ConfigService,
					useValue: mockConfigService,
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
		authContext = module.get<AuthContext>(AuthContext);
		usersService = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('register', () => {
		const registerDto = {
			email: 'test@example.com',
			name: 'Test User',
			password: 'Password1!',
		};

		it('should call authService.register with the provided dto', async () => {
			const expectedResult = {
				user: mockUser,
				accessToken: 'access-token',
				refreshToken: 'refresh-token',
			};
			mockAuthService.register.mockResolvedValue(expectedResult);

			const result = await controller.register(registerDto);

			expect(authService.register).toHaveBeenCalledWith(registerDto);
			expect(result).toEqual(expectedResult);
		});
	});

	describe('login', () => {
		const loginDto = {
			email: 'test@example.com',
			password: 'Password1!',
		};

		it('should call authService.login with the provided dto', async () => {
			const expectedResult = {
				user: mockUser,
				accessToken: 'access-token',
				refreshToken: 'refresh-token',
			};
			mockAuthService.login.mockResolvedValue(expectedResult);

			const result = await controller.login(loginDto);

			expect(authService.login).toHaveBeenCalledWith(loginDto);
			expect(result).toEqual(expectedResult);
		});
	});

	describe('me', () => {
		it('should return the current user', async () => {
			mockAuthContext.getUser.mockReturnValue({ sub: 'user-id', email: 'test@example.com' });
			mockUsersService.findById.mockResolvedValue(mockUser);

			const result = await controller.me();

			expect(authContext.getUser).toHaveBeenCalled();
			expect(usersService.findById).toHaveBeenCalledWith('user-id', { hidePassword: true });
			expect(result).toEqual(mockUser);
		});
	});
});
