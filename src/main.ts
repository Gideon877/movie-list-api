import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	const PORT = process.env.PORT ?? 4005;
	await app.listen(PORT);
	console.log(`Application is running on: http://localhost:${PORT}`);

}
bootstrap();
