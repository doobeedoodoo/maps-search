import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Maps Search')
  .setDescription(
    'The Maps Search API takes a partial address input and returns full address suggestions along with their details using the TomTom API.',
  )
  .setVersion('1.0')
  .addTag('maps-search')
  .build();
