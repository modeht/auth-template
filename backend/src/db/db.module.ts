import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
	imports: [
		MongooseModule.forRootAsync({
			useFactory: (configService: ConfigService) => {
				if (configService.get('MONGO_USERNAME') && configService.get('MONGO_PASSWORD')) {
					const uri = `mongodb://${configService.get('MONGO_USERNAME')}:${configService.get('MONGO_PASSWORD')}@${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get('MONGO_DATABASE')}`;
					return {
						uri,
						authSource: 'admin',
					};
				}
				return {
					uri: `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get('MONGO_DATABASE')}`,
				};
			},
			inject: [ConfigService],
		}),
	],
})
export class DbModule {}
