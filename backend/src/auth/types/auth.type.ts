import { type UserDocument } from '../../users/schemas/user.schema';

export type RegisterResponse = {
	user: UserDocument;
	accessToken: string;
	refreshToken: string;
};

export type SessionToken = {
	sub: string;
	email: string;
};
