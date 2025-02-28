import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

// matches one lowercase, one uppercase, one number, one special character, min 8 characters
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class RegisterDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	name: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@Matches(passwordRegex, {
		message:
			'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character and be at least 8 characters long',
	})
	password: string;
}
