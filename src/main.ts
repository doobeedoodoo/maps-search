import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { mapValidationErrors } from './utils';

const DEFAULT_PORT = 3000;

// TODO: readme

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(mapValidationErrors(validationErrors));
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? DEFAULT_PORT, '0.0.0.0');
}
bootstrap();
