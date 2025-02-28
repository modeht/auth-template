import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { SessionToken } from '../types/auth.type';
import { AuthContext } from '../auth.context';
import { UsersService } from '../../users/users.service';
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
		private usersService: UsersService,
		private authContext: AuthContext,
	) {}

	async canActivate(ctx: ExecutionContext) {
		const request = ctx.switchToHttp().getRequest<FastifyRequest>();
		const token = request.headers?.authorization?.split(' ') || [];
		console.log('token', token);
		if (token[0]?.toLocaleLowerCase() !== 'bearer') {
			throw new BadRequestException('Bearer token malformed');
		}
		if (!token[1]) {
			throw new BadRequestException('Missing token');
		}

		try {
			const payload = await this.jwtService.verifyAsync<SessionToken>(token[1], {
				secret: this.configService.getOrThrow('JWT_SECRET'),
			});
			request.session = payload;
			this.authContext.setUser(request.session);
		} catch (error: any) {
			throw new BadRequestException('Token malformed');
		}
		const user = await this.usersService.findById(request.session.sub);
		if (!user) {
			throw new ForbiddenException('Invalid user');
		}
		return true;
	}
}
