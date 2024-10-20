import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/filters';
import * as pactum from 'pactum';

describe('app end-to-end', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const PACTUM_SERVER_PORT = parseInt(process.env.PACTUM_SERVER_PORT);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
    await app.listen(PACTUM_SERVER_PORT);
    pactum.request.setBaseUrl(`http://localhost:${PACTUM_SERVER_PORT}`);
  });

  afterAll(() => {
    app.close();
  });

  describe('/search (GET)', () => {
    it('should return search results for a valid query', () => {
      return pactum
        .spec()
        .get('/search/1%20charlotte%20street')
        .expectStatus(200)
        .expect((context) => {
          const responseBody = context.res.body;
          const meta = responseBody.meta;
          const firstElement = responseBody.data[0];

          expect(responseBody).toBeDefined();
          expect(meta).toHaveProperty('path');
          expect(meta).toHaveProperty('count');
          expect(firstElement).toHaveProperty('placeId');
          expect(firstElement).toHaveProperty('streetNumber');
          expect(firstElement).toHaveProperty('countryCode');
          expect(firstElement).toHaveProperty('country');
          expect(firstElement).toHaveProperty('freeformAddress');
          expect(firstElement).toHaveProperty('municipality');
        });
    });

    it.skip('handles optional query parameters correctly', () => {
      return pactum.spec().get('/search/brisbane').expectStatus(200);
    });

    it.skip('handles invalid search queries', () => {
      return pactum.spec().get('/search/brisbane').expectStatus(200);
    });
  });
});
