export default () => ({
  tomtom: {
    url: process.env.TOMTOM_API_URL,
    path: process.env.TOMTOM_API_PATH,
    key: process.env.TOMTOM_API_KEY,
    responseFormat: process.env.TOMTOM_RESPONSE_FORMAT || 'json',
  },
  search: {
    limit: parseInt(process.env.DEFAULT_SEARCH_RESULTS_LIMIT) || 10,
    countries: process.env.COUNTRIES,
  },
});
