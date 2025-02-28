import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { LanguageEnum } from '../lib/enums';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthContextModule } from './auth/auth.context';

@Module({
	imports: [
		I18nModule.forRoot({
			fallbackLanguage: LanguageEnum.EN,
			loaderOptions: {
				path: join(process.cwd(), 'src/i18n/'),
				watch: true,
				includeSubfolders: true,
			},
			typesOutputPath: join(process.cwd(), 'src/generated/i18n.types.ts'),
			resolvers: [
				{
					use: QueryResolver,
					options: ['lang'],
				},
				{
					use: HeaderResolver,
					options: ['x-lang'],
				},
				AcceptLanguageResolver,
			],
		}),
		ConfigModule.forRoot({
			envFilePath: ['.env.local', '.env'],
			isGlobal: true,
		}),
		JwtModule.registerAsync({
			global: true,
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow('JWT_SECRET'),
				signOptions: {
					algorithm: 'HS256',
					issuer: 'easygenerator',
				},
			}),
			inject: [ConfigService],
		}),
		DbModule,
		AuthModule,
		AuthContextModule,
	],
	controllers: [AppController],
	providers: [AppService],
	exports: [],
})
export class AppModule {}
