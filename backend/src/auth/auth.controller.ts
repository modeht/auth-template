import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { RegisterResponse } from './types/auth.type';
import { LoginDto } from './dtos/login.dto';
import { UserDocument } from './schemas/user.schema';
import { AuthContext } from './auth.context';
import { UserService } from './user.service';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly authContext: AuthContext,
		private readonly userService: UserService,
	) {}

	@Post('register')
	async register(@Body() user: RegisterDto): Promise<RegisterResponse> {
		return this.authService.register(user);
	}

	@Post('login')
	async login(@Body() user: LoginDto): Promise<RegisterResponse> {
		return this.authService.login(user);
	}

	@Get('me')
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	async me(): Promise<UserDocument> {
		return this.userService.findById(this.authContext.getUser().sub, { hidePassword: true });
	}
}
