import { SearchResponse } from '../types';

export const mapSearchResponse = (searchResponse: any): SearchResponse[] => {
  if (!searchResponse || !searchResponse.results) {
    return [];
  }

  return searchResponse.results.map((place: any) => {
    const { address } = place;

    return {
      placeId: place.id,
      freeformAddress: address?.freeformAddress,
      streetNumber: address?.streetNumber || null,
      municipality: address?.municipality,
      countryCode: address?.countryCode,
      country: address?.country,
    };
  });
};
