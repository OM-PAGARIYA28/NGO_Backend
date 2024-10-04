import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipes for request validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS and allow your frontend to access the API
  app.enableCors({
    origin: 'http://localhost:5173', // Allow your frontend React app
    methods: 'GET,POST,PUT,DELETE',  // Define allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allow these headers
    credentials: true,  // If you're dealing with cookies/auth
  });

  await app.listen(3000);
}

bootstrap();
