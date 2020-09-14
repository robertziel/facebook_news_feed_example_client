# Facebook like News Feeds client example in ReactJS

[![Build Status](https://travis-ci.com/robertziel/facebook_news_feed_example_client.svg?branch=master)](https://travis-ci.com/robertziel/facebook_news_feed_example_client) [![Coverage Status](https://coveralls.io/repos/github/robertziel/facebook_news_feed_example_client/badge.svg?branch=master)](https://coveralls.io/github/robertziel/facebook_news_feed_example_client?branch=master)

Init commit based on https://github.com/robertziel/react_graphql_jwt_auth_boilerplate

Backend API: https://github.com/robertziel/facebook_news_feed_example_api

## Quick start

Clone .env.example to .env for local development.

```
cp .env.example .env
```

Run using npm
```
npm install
npm start
```

## Docker

Repository contains basic docker setup. Depending on needs you can run app locally using both traditional `npm start` or `docker-compose`.

Docker compose is set up as default to run locally in **development** environment but can be easily changed for production needs.

1. Build:
```
docker-compose build
```

2. Start containers and check `localhost:3000`:
```
docker-compose up
```

3. Shut down containers:
```
docker-compose down
```
