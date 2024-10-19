import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SearchRequest } from 'src/search/types';

@Injectable()
export class MapsService {
  constructor(private configService: ConfigService) {}

  async search({ searchQuery, options }: SearchRequest) {
    const tomTomApiUrl = this.configService.get('TOMTOM_API_URL');
    const countrySet = this.configService.get('COUNTRIES');
    try {
      const response = await axios.get(
        `${tomTomApiUrl}/search/2/search/${searchQuery}.json'`, // TODO: put .json in default
        {
          params: {
            key: 'Oyb0npJAVdRwDauqpFez7zKCy2euUYql', // TODO: store somewhere safe
            limit: options.limit, // TODO: add default. 100?
            countrySet,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
