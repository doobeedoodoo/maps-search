import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { HttpStatusCode } from 'axios';
import { SearchRequest } from 'src/search/types';

@Injectable()
export class MapsService {
  constructor(private configService: ConfigService) {}

  private handleError(error: any) {
    const statusCode = error.response?.status;
    const statusText = error.response?.statusText;
    const errorText = error.response?.data?.errorText;

    // TODO: add logger

    throw new HttpException(
      errorText || statusText || 'Internal server error',
      statusCode || HttpStatusCode.InternalServerError,
    );
  }

  async search({ searchQuery, options }: SearchRequest) {
    const tomTomApiUrl = this.configService.get('TOMTOM_API_URL');
    const countrySet = this.configService.get('COUNTRIES');
    const DEFAULT_SEARCH_RESULTS_LIMIT = this.configService.get(
      'DEFAULT_SEARCH_RESULTS_LIMIT',
    );

    try {
      const response = await axios.get(
        `${tomTomApiUrl}/search/2/search/${searchQuery}.json'`,
        {
          params: {
            key: 'Oyb0npJAVdRwDauqpFez7zKCy2euUYql', // TODO: store somewhere safe
            limit: options.limit || DEFAULT_SEARCH_RESULTS_LIMIT,
            countrySet,
          },
        },
      );

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
