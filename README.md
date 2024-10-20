# maps-search

Welcome to **maps-search**! This project enables users to search for addresses and retrieve detailed information by simply providing a partial address.

## Key Features

- **Partial Address Search**: Supports fuzzy query-based relevant addresses and POIs.
- **Detailed Address Information**: Includes detailed information about addresses.
- **TomTom API Integration**: Utilizes TomTom API for accurate and up-to-date search results.
- **Built with NestJS**: Enjoy a robust and scalable architecture, ensuring a seamless user experience.

## Project setup

```bash
$ yarn install
```

## Environment variables

An .env.dist file that contains the environment variables required is included.

```bash
TOMTOM_API_URL="https://api.tomtom.com"
TOMTOM_API_KEY="replace-me"
COUNTRIES="AU"
DEFAULT_SEARCH_RESULTS_LIMIT=100
PORT=3000
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

A deployed instance can be found at https://maps-search-production.up.railway.app. 

The swagger page can be accessed at https://maps-search-production.up.railway.app/api.

Example queries:

https://maps-search-production.up.railway.app/search/1%20charlotte%20street
https://maps-search-production.up.railway.app/search/brisbane%20city?limit=10

## Stay in touch

- Author - [Mac Sta Maria](https://www.linkedin.com/in/mark-stephen-sta-maria/)
