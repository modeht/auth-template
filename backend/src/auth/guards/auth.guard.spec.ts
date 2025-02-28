import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { AuthContext } from '../auth.context';
import { BadRequestException, ExecutionContext, ForbiddenException } from '@nestjs/common';

describe('AuthGuard', () => {
	let guard: AuthGuard;
	let jwtService: JwtService;
	let configService: ConfigService;
	let usersService: UsersService;
	let authContext: AuthContext;

	const mockUser = {
		_id: 'user-id',
		email: 'test@example.com',
	};

	const mockJwtService = {
		verifyAsync: jest.fn(),
	};

	const mockConfigService = {
		getOrThrow: jest.fn(),
	};

	const mockUsersService = {
		findById: jest.fn(),
	};

	const mockAuthContext = {
		setUser: jest.fn(),
	};

	// Create a properly typed mock for the execution context
	const createMockExecutionContext = () => {
		const mockRequest = jest.fn() as jest.Mock;
		const mockHttp = {
			getRequest: mockRequest,
		};
		const mockSwitchToHttp = jest.fn().mockReturnValue(mockHttp);

		return {
			switchToHttp: mockSwitchToHttp,
		} as unknown as ExecutionContext;
	};

	beforeEach(async () => {
		jest.clearAllMocks();

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthGuard,
				{
					provide: JwtService,
					useValue: mockJwtService,
				},
				{
					provide: ConfigService,
					useValue: mockConfigService,
				},
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
				{
					provide: AuthContext,
					useValue: mockAuthContext,
				},
			],
		}).compile();

		guard = module.get<AuthGuard>(AuthGuard);
		jwtService = module.get<JwtService>(JwtService);
		configService = module.get<ConfigService>(ConfigService);
		usersService = module.get<UsersService>(UsersService);
		authContext = module.get<AuthContext>(AuthContext);
	});

	it('should be defined', () => {
		expect(guard).toBeDefined();
	});

	describe('canActivate', () => {
		it('should throw BadRequestException if authorization header is missing', async () => {
			const mockContext = createMockExecutionContext();
			const mockRequest = mockContext.switchToHttp().getRequest as jest.Mock;
			mockRequest.mockReturnValue({
				headers: {},
			});

			await expect(guard.canActivate(mockContext)).rejects.toThrow(BadRequestException);
		});

		it('should throw BadRequestException if token type is not bearer', async () => {
			const mockContext = createMockExecutionContext();
			const mockRequest = mockContext.switchToHttp().getRequest as jest.Mock;
			mockRequest.mockReturnValue({
				headers: {
					authorization: 'Basic token',
				},
			});

			await expect(guard.canActivate(mockContext)).rejects.toThrow(BadRequestException);
		});

		it('should throw BadRequestException if token is missing', async () => {
			const mockContext = createMockExecutionContext();
			const mockRequest = mockContext.switchToHttp().getRequest as jest.Mock;
			mockRequest.mockReturnValue({
				headers: {
					authorization: 'Bearer ',
				},
			});

			await expect(guard.canActivate(mockContext)).rejects.toThrow(BadRequestException);
		});

		it('should throw BadRequestException if token verification fails', async () => {
			const mockContext = createMockExecutionContext();
			const mockRequest = mockContext.switchToHttp().getRequest as jest.Mock;
			mockRequest.mockReturnValue({
				headers: {
					authorization: 'Bearer token',
				},
			});
			mockConfigService.getOrThrow.mockReturnValue('jwt-secret');
			mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

			await expect(guard.canActivate(mockContext)).rejects.toThrow(BadRequestException);
			expect(configService.getOrThrow).toHaveBeenCalledWith('JWT_SECRET');
			expect(jwtService.verifyAsync).toHaveBeenCalledWith('token', {
				secret: 'jwt-secret',
			});
		});

		it('should throw ForbiddenException if user does not exist', async () => {
			const mockContext = createMockExecutionContext();
			const mockRequest = mockContext.switchToHttp().getRequest as jest.Mock;
			const request: any = {
				headers: {
					authorization: 'Bearer token',
				},
			};
			mockRequest.mockReturnValue(request);
			mockConfigService.getOrThrow.mockReturnValue('jwt-secret');
			mockJwtService.verifyAsync.mockResolvedValue({ sub: 'user-id', email: 'test@example.com' });
			mockUsersService.findById.mockResolvedValue(null);

			await expect(guard.canActivate(mockContext)).rejects.toThrow(ForbiddenException);
			expect(configService.getOrThrow).toHaveBeenCalledWith('JWT_SECRET');
			expect(jwtService.verifyAsync).toHaveBeenCalledWith('token', {
				secret: 'jwt-secret',
			});
			expect(request.session).toEqual({ sub: 'user-id', email: 'test@example.com' });
			expect(authContext.setUser).toHaveBeenCalledWith({ sub: 'user-id', email: 'test@example.com' });
			expect(usersService.findById).toHaveBeenCalledWith('user-id');
		});

		it('should return true if token is valid and user exists', async () => {
			const mockContext = createMockExecutionContext();
			const mockRequest = mockContext.switchToHttp().getRequest as jest.Mock;
			const request: any = {
				headers: {
					authorization: 'Bearer token',
				},
			};
			mockRequest.mockReturnValue(request);
			mockConfigService.getOrThrow.mockReturnValue('jwt-secret');
			mockJwtService.verifyAsync.mockResolvedValue({ sub: 'user-id', email: 'test@example.com' });
			mockUsersService.findById.mockResolvedValue(mockUser);

			const result = await guard.canActivate(mockContext);

			expect(configService.getOrThrow).toHaveBeenCalledWith('JWT_SECRET');
			expect(jwtService.verifyAsync).toHaveBeenCalledWith('token', {
				secret: 'jwt-secret',
			});
			expect(request.session).toEqual({ sub: 'user-id', email: 'test@example.com' });
			expect(authContext.setUser).toHaveBeenCalledWith({ sub: 'user-id', email: 'test@example.com' });
			expect(usersService.findById).toHaveBeenCalledWith('user-id');
			expect(result).toBe(true);
		});
	});
});
