import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  const host = '172.17.0.1'; // O 'localhost', según lo que prefieras
  await app.listen(3000, host || 'localhost');
  }
bootstrap();