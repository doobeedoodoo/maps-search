import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { SearchService } from '../search.service';
import { mockTomTomApiResponse } from '../../mocks';
import { MapsService } from '../../integrations/maps/maps.service';
import { SearchResponse } from '../types';

const mockMapsService = (data) =>
  createMock<MapsService>({
    search: async (searchParameters) => {
      if (searchParameters) return Promise.resolve(data);
      return Promise.reject(new Error('invalid search'));
    },
  });

const createMockModule = async (data) => {
  return await Test.createTestingModule({
    providers: [
      SearchService,
      { provide: MapsService, useValue: mockMapsService(data) },
    ],
  }).compile();
};

describe('search service', () => {
  it('should return mapped results', async () => {
    const searchService = (
      await createMockModule(mockTomTomApiResponse)
    ).get<SearchService>(SearchService);

    const searchRequest = {
      searchQuery: '1%20charlotte%20street',
      options: { limit: 1 },
    };

    const results = await searchService.search(searchRequest);

    const expected: SearchResponse[] = [
      {
        country: 'United States',
        countryCode: 'US',
        freeformAddress: 'Charlotte Avenue, Sanford, NC 27330',
        municipality: 'Sanford',
        placeId: 'A809b1sNvhvuQciIXHmiPA',
        streetNumber: null,
      },
    ];

    expect(searchService).toBeDefined();

    expect(results).toEqual(expected);
  });

  it('should be able to handle if tom tom returns an empty response', async () => {
    const searchService = (await createMockModule({})).get<SearchService>(
      SearchService,
    );

    const searchRequest = {
      searchQuery: '1%20charlotte%20street',
      options: { limit: 1 },
    };

    const results = await searchService.search(searchRequest);

    expect(searchService).toBeDefined();

    expect(results).toEqual([]);
  });
});
