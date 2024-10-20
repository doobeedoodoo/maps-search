export const mockTomTomApiResponse = {
  summary: {
    query: '1 charlotte street',
    queryType: 'NON_NEAR',
    queryTime: 150,
    numResults: 1,
    offset: 0,
    totalResults: 100,
    fuzzyLevel: 1,
    queryIntent: [],
  },
  results: [
    {
      type: 'Street',
      id: 'A809b1sNvhvuQciIXHmiPA',
      score: 6.5185279846,
      address: {
        streetName: 'Charlotte Avenue',
        municipality: 'Sanford',
        countrySecondarySubdivision: 'Lee',
        countrySubdivision: 'NC',
        countrySubdivisionName: 'North Carolina',
        countrySubdivisionCode: 'NC',
        postalCode: '27330',
        extendedPostalCode:
          '27330-4300, 27330-4304, 27330-4317, 27330-4318, 27330-4319, 27330-4320, 27330-4344, 27330-4345, 27330-4363, 27330-4415, 27330-4416, 27330-4417, 27330-4437, 27330-4445, 27330-4447, 27330-4448, 27330-4460, 27330-4523, 27330-4524, 27330-4525, 27330-4526, 27330-4536, 27330-4554, 27330-4555, 27330-4556, 27330-4613, 27330-4614, 27330-4615, 27330-4617, 27330-4618, 27330-4619, 27330-4620, 27330-4621, 27330-4622',
        countryCode: 'US',
        country: 'United States',
        countryCodeISO3: 'USA',
        freeformAddress: 'Charlotte Avenue, Sanford, NC 27330',
        localName: 'Sanford',
      },
      position: {
        lat: 35.483901,
        lon: -79.165956,
      },
      viewport: {
        topLeftPoint: {
          lat: 35.49282,
          lon: -79.17674,
        },
        btmRightPoint: {
          lat: 35.47484,
          lon: -79.15465,
        },
      },
    },
  ],
};

export const mockTomTomApiResponseData = {
  data: mockTomTomApiResponse,
};
