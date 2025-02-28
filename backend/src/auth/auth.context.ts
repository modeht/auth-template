import { Global, Injectable, Module, Scope } from '@nestjs/common';
import { SessionToken } from './types/auth.type';

@Injectable({
	scope: Scope.REQUEST,
})
export class AuthContext {
	private sub: string;
	private email: string;

	constructor() {}

	getUser(): SessionToken | null {
		if (!this.sub) return null;
		return {
			sub: this.sub,
			email: this.email,
		};
	}

	setUser(user: SessionToken) {
		this.sub = user.sub;
		this.email = user.email;
	}
}

@Global()
@Module({
	providers: [AuthContext],
	exports: [AuthContext],
})
export class AuthContextModule {}
