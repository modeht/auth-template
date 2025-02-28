import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { type RegisterResponse } from './types/auth.type';
import { LoginDto } from './dtos/login.dto';
import { UserDocument } from '../users/schemas/user.schema';
import { User } from '../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private jwtService: JwtService,
		private usersService: UsersService,
	) {}

	async register(user: RegisterDto): Promise<RegisterResponse> {
		const existingUser = await this.usersService.findByEmail(user.email);
		if (existingUser) {
			throw new ConflictException('User already exists');
		}

		user.password = await hash(user.password, SALT_ROUNDS);
		user.email = user.email.toLowerCase();
		const createdUser = await this.userModel.insertOne(user);
		const tokens = await this.createAuthTokens(createdUser);

		return {
			user: await this.usersService.findById(createdUser._id.toString(), { hidePassword: true }),
			...tokens,
		};
	}

	async login(user: LoginDto): Promise<RegisterResponse> {
		const existingUser = await this.usersService.findByEmail(user.email);
		if (!existingUser) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isPasswordValid = await compare(user.password, existingUser.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const tokens = await this.createAuthTokens(existingUser);
		const userSecured = await this.usersService.findById(existingUser._id.toString(), { hidePassword: true });

		return {
			user: userSecured,
			...tokens,
		};
	}

	async createAuthTokens(user: UserDocument) {
		const payload = { sub: user._id, email: user.email };
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				expiresIn: '1h',
			}),
			this.jwtService.signAsync(payload, {
				expiresIn: '7d',
			}),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}
}
