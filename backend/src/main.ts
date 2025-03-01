import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { GeneralExceptionFilter } from './globals/filters/exception.filter';
import { I18nService } from 'nestjs-i18n';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { stdout } from 'process';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			trustProxy: true,
			logger: {
				stream: stdout,
				transport: {
					target: 'pino-pretty',
					options: {
						colorize: true,
					},
				},
			},
		}),
	);

	app.use(helmet());
	app.enableCors();

	app.useStaticAssets({
		root: join(process.cwd(), 'public'),
		prefix: '/assets/',
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			stopAtFirstError: true,
			exceptionFactory(errors) {
				return new BadRequestException(Object.values(errors[0].constraints).join(', '));
			},
		}),
	);
	app.useGlobalFilters(new GeneralExceptionFilter(app.get(I18nService)));

	app.enableVersioning({
		prefix: 'v',
		defaultVersion: '1',
		type: VersioningType.URI,
	});

	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('Easygenerator API')
		.addBearerAuth()
		.setVersion('0.1.0')
		.setExternalDoc('Postman Collection', '/api-json')
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory);

	const configService = app.get(ConfigService);
	const PORT = configService.getOrThrow('BACKEND_PORT');

	await app.listen(PORT, '0.0.0.0', () => {
		console.log('API server listening on http://localhost:' + PORT);
	});
}

bootstrap();
