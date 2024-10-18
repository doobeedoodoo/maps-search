export const mapSearchResponse = (searchResponse) => {
  const { results } = searchResponse;

  return results.map((result) => {
    const { address } = result;

    return {
      placeId: result.id,
      streetNumber: address?.streetNumber || null,
      countryCode: address?.countryCode || null,
      country: address?.country || null,
      freeformAddress: address?.freeformAddress || null,
      municipality: address?.municipality || null,
    };
  });
};
