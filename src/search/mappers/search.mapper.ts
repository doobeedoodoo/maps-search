import { SearchResponse } from '../types';

export const mapSearchResponse = (searchResponse): SearchResponse[] => {
  if (!searchResponse || !searchResponse.results) {
    return [];
  }

  return searchResponse.results.map((result) => {
    const { address } = result;

    return {
      placeId: result.id,
      freeformAddress: address?.freeformAddress || null,
      streetNumber: address?.streetNumber || null,
      municipality: address?.municipality || null,
      countryCode: address?.countryCode || null,
      country: address?.country || null,
    };
  });
};
