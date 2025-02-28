import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async findByEmail(email: string): Promise<UserDocument | null> {
		return this.userModel.findOne({ email: email.toLowerCase() });
	}

	async findById(id: string, { hidePassword = false }: { hidePassword?: boolean } = {}): Promise<UserDocument | null> {
		return this.userModel.findById(id).select('-__v' + (hidePassword ? ' -password' : ''));
	}
}
