import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger';

const DEFAULT_PORT = 3000;

// TODO: add interceptors for formatting JSON api response
// TODO: add interceptors for logging

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? DEFAULT_PORT, '0.0.0.0');
}
bootstrap();
