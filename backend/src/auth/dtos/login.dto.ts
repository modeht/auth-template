import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { passwordRegex } from './register.dto';

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@Matches(passwordRegex, {
		message:
			'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character and be at least 8 characters long',
	})
	password: string;
}
