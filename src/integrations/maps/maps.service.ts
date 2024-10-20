import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { HttpStatusCode } from 'axios';
import { SearchConfig, TomTomConfig } from 'src/config/configuration.type';
import { SearchRequest } from 'src/search/types';

@Injectable()
export class MapsService {
  private logger = new Logger(MapsService.name);

  constructor(private configService: ConfigService) {}

  private handleError(error) {
    const statusCode =
      error.response?.status || HttpStatusCode.InternalServerError;
    const errorText = error.response?.data?.errorText;
    const statusText = error.response?.statusText;
    const message = errorText || statusText || 'Internal server error';

    this.logger.error(`${statusCode} - ${message}`);

    throw new HttpException(message, statusCode);
  }

  async search({ searchQuery, options }: SearchRequest) {
    const tomTomConfig = this.configService.get<TomTomConfig>('tomtom');

    if (!tomTomConfig.url || !tomTomConfig.path) {
      throw new HttpException(
        'TomTom API url / path is missing in config',
        HttpStatusCode.InternalServerError,
      );
    }

    if (!tomTomConfig.key) {
      throw new HttpException(
        'TomTom API key is missing in config',
        HttpStatusCode.Forbidden,
      );
    }

    const searchConfig = this.configService.get<SearchConfig>('search');

    try {
      const response = await axios.get(
        `${tomTomConfig.url}${tomTomConfig.path}/${searchQuery}.${tomTomConfig.responseFormat}`,
        {
          params: {
            key: tomTomConfig.key,
            limit: options.limit || searchConfig.limit,
            ...(searchConfig.countries
              ? { countrySet: searchConfig.countries }
              : {}),
          },
        },
      );

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
