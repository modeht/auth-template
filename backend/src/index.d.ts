import { SessionToken } from './auth/types/auth.type';

declare module 'fastify' {
	interface FastifyRequest {
		session: SessionToken;
	}
}
