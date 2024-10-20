import { ConfigService } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import axios from 'axios';
import { MapsService } from '../maps.service';
import { mockTomTomApiResponseData } from '../../../mocks/tomtom.mocks';
import { mockConfig } from '../mocks/config.mock';

const mockConfigService = (mockConfig) =>
  createMock<ConfigService>({
    get: (configKey) => mockConfig[configKey],
  });

const createMockModule = async (mockConfig) => {
  return await Test.createTestingModule({
    providers: [
      MapsService,
      { provide: ConfigService, useValue: mockConfigService(mockConfig) },
    ],
  }).compile();
};

describe('maps service', () => {
  it('should call tom tom api search endpoint', async () => {
    const mapsService = (await createMockModule(mockConfig)).get<MapsService>(
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
    const mapsService = (await createMockModule(mockConfig)).get<MapsService>(
      MapsService,
    );

    jest.spyOn(axios, 'get').mockRejectedValue(new Error('error'));

    const searchRequest = {
      searchQuery: '1%20charlotte%20street',
      options: { limit: 1 },
    };

    expect(mapsService.search(searchRequest)).rejects.toThrow('error');
  });

  it('should handle scenario where tomtom url / path is not set properly', async () => {
    const incompleteMockConfig = {
      ...mockConfig,
      tomtom: {
        ...mockConfig.tomtom,
        url: '',
        path: '',
      },
    };

    const mapsService = (
      await createMockModule(incompleteMockConfig)
    ).get<MapsService>(MapsService);

    const searchRequest = {
      searchQuery: '1%20charlotte%20street',
      options: { limit: 1 },
    };

    expect(mapsService.search(searchRequest)).rejects.toThrow(
      'TomTom API url / path is missing in config',
    );
  });

  it('should handle scenario where tomtom key is missing', async () => {
    const incompleteMockConfig = {
      ...mockConfig,
      tomtom: {
        ...mockConfig.tomtom,
        key: '',
      },
    };

    const mapsService = (
      await createMockModule(incompleteMockConfig)
    ).get<MapsService>(MapsService);

    const searchRequest = {
      searchQuery: '1%20charlotte%20street',
      options: { limit: 1 },
    };

    expect(mapsService.search(searchRequest)).rejects.toThrow(
      'TomTom API key is missing in config',
    );
  });
});
