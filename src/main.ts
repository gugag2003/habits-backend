import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create a Nest application instance based on the root module.
  const app = await NestFactory.create(AppModule);
  // Enable CORS so that the React application can make requests from a different origin.
  app.enableCors();
  // Listen on the port defined by the environment or default to 3333.
  const port = process.env.PORT || 3333;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}

bootstrap();