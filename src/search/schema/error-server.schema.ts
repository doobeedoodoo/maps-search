export const internalServerErrorSchema = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
      example: 500,
    },
    timestamp: {
      type: 'string',
      example: '2024-10-19T09:57:54.536Z',
    },
    path: {
      type: 'string',
      example: '/search/1%20charlotte%20street',
    },
    message: {
      type: 'string',
      example: 'Internal server error.',
    },
  },
};
