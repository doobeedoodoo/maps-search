import { ConfigService } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import axios from 'axios';
import { MapsService } from '../maps.service';
import { mockTomTomApiResponseData } from '../../../mocks/tomtom.mocks';

const mockConfigService = () =>
  createMock<ConfigService>({
    get: (configKey) => {
      const mockConfig = {
        TOMTOM_API_URL: 'https://api.tomtom.com',
        TOMTOM_API_KEY: 'mockApiKey',
        COUNTRIES: 'AU',
        DEFAULT_SEARCH_RESULTS_LIMIT: 10,
      };
      return mockConfig[configKey];
    },
  });

const createMockModule = async () => {
  return await Test.createTestingModule({
    providers: [
      MapsService,
      { provide: ConfigService, useValue: mockConfigService() },
    ],
  }).compile();
};

describe('maps service', () => {
  it('should return results from tom tom api', async () => {
    const mapsService = (await createMockModule()).get<MapsService>(
      MapsService,
    );

    jest.spyOn(axios, 'get').mockResolvedValue(mockTomTomApiResponseData);

    const searchRequest = {
      searchQuery: '1%20charlotte%20street',
      options: { limit: 1 },
    };

    const results = await mapsService.search(searchRequest);

    expect(mapsService).toBeDefined();

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.tomtom.com/search/2/search/1%20charlotte%20street.json',
      { params: { countrySet: 'AU', key: 'mockApiKey', limit: 1 } },
    );

    expect(results).toEqual(mockTomTomApiResponseData.data);
  });

  it('should handle error response from tom tom api', async () => {
    const mapsService = (await createMockModule()).get<MapsService>(
      MapsService,
    );

    jest.spyOn(axios, 'get').mockRejectedValue(new Error('error'));

    const searchRequest = {
      searchQuery: '1%20charlotte%20street',
      options: { limit: 1 },
    };

    expect(mapsService.search(searchRequest)).rejects.toThrow('error');
  });
});
