export const successSchema = {
  type: 'object',
  properties: {
    meta: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          example: '1 charlotte street',
        },
        count: {
          type: 'number',
          example: 1,
        },
      },
    },
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          placeId: {
            type: 'string',
            example: 'dK02J2NUGekCcSf9MtpuOA',
          },
          freeformAddress: {
            type: 'string',
            example: '1 Charlotte Street, Sunshine West, VIC, 3020',
          },
          streetNumber: {
            type: 'string',
            example: '1',
          },
          municipality: {
            type: 'string',
            example: 'Melbourne',
          },
          countryCode: {
            type: 'string',
            example: 'AU',
          },
          country: {
            type: 'string',
            example: 'Australia',
          },
        },
      },
    },
  },
};
