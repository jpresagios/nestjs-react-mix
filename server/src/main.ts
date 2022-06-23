import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './configs/swagger.config';
import env from './configs/env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(env.API_PORT);
}
bootstrap();
