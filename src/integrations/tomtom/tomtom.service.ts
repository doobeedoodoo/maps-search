import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TomTomService {
  constructor(private configService: ConfigService) {}

  async search({ searchQuery, options }) {
    // TODO: type
    const tomTomApiUrl = this.configService.get('TOMTOM_API_URL');
    try {
      const response = await axios.get(
        `${tomTomApiUrl}/search/2/search/${searchQuery}.json'`, // TODO: put .json in default
        {
          params: {
            key: 'Oyb0npJAVdRwDauqpFez7zKCy2euUYql', // TODO: store somewhere safe
            limit: options.limit, // TODO: add default. 100?
          },
        },
      );

      return { data: response.data };
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
