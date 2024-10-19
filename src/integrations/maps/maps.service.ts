import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { HttpStatusCode } from 'axios';
import { SearchRequest } from 'src/search/types';

@Injectable()
export class MapsService {
  private logger = new Logger(MapsService.name);

  constructor(private configService: ConfigService) {}

  private handleError(error: any) {
    const statusCode = error.response?.status;
    const errorText = error.response?.data?.errorText;
    const statusText = error.response?.statusText;

    this.logger.error(`${statusCode} - ${errorText || statusText}`);

    throw new HttpException(
      errorText || statusText || 'Internal server error',
      statusCode || HttpStatusCode.InternalServerError,
    );
  }

  async search({ searchQuery, options }: SearchRequest) {
    const tomTomApiUrl = this.configService.get('TOMTOM_API_URL');
    const tomTomApiKey = this.configService.get('TOMTOM_API_KEY');
    const countrySet = this.configService.get('COUNTRIES');
    const DEFAULT_SEARCH_RESULTS_LIMIT = this.configService.get(
      'DEFAULT_SEARCH_RESULTS_LIMIT',
    );

    try {
      const response = await axios.get(
        `${tomTomApiUrl}/search/2/search/${searchQuery}.json'`,
        {
          params: {
            key: tomTomApiKey,
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
