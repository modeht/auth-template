import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { LanguageEnum } from '../lib/enums';

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
			envFilePath: ['.env.dev.local', '.env'],
			isGlobal: true,
		}),
		DbModule,
	],
	controllers: [AppController],
	providers: [AppService],
	exports: [],
})
export class AppModule {}
