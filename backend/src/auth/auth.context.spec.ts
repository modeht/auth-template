import { Test, TestingModule } from '@nestjs/testing';
import { AuthContext } from './auth.context';

describe('AuthContext', () => {
	let moduleRef: TestingModule;

	beforeEach(async () => {
		moduleRef = await Test.createTestingModule({
			providers: [AuthContext],
		}).compile();
	});

	it('should be defined', async () => {
		const authContext = await moduleRef.resolve(AuthContext);
		expect(authContext).toBeDefined();
	});

	it('should return null when user is not set', async () => {
		const authContext = await moduleRef.resolve(AuthContext);
		expect(authContext.getUser()).toBeNull();
	});

	it('should set and get user correctly', async () => {
		const authContext = await moduleRef.resolve(AuthContext);
		const user = { sub: 'user-id', email: 'test@example.com' };

		authContext.setUser(user);

		expect(authContext.getUser()).toEqual(user);
	});
});
