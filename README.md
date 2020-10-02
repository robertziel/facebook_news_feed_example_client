# Facebook like News Feeds client example in ReactJS

[![Build Status](https://travis-ci.com/robertziel/facebook_news_feed_example_client.svg?branch=master)](https://travis-ci.com/robertziel/facebook_news_feed_example_client) [![Coverage Status](https://coveralls.io/repos/github/robertziel/facebook_news_feed_example_client/badge.svg?branch=master)](https://coveralls.io/github/robertziel/facebook_news_feed_example_client?branch=master)

Init commit based on https://github.com/robertziel/react_graphql_jwt_auth_boilerplate

Backend API: https://github.com/robertziel/facebook_post_example_api

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
Go to http://localhost:3000/

## To do

* Translate Material UI validations
* Links in some links doesn't work as single page app (in Sign up and Sign in pages)
* Store new profile data after updated
* Don't hardcode path
* Paragraphs in posts (now css does the thing, which is not good). Also maybe add paragraphs for posts on HomePage, but this is just truncated text'
* When visit /post/:id for non existing post, it should tell user that post is not found
* When user reacts, and connection error occurs, it should revert reaction highlight to previous one
* Reactions subscriptions would be nice
* Use one icons source, currently are Awesome Font and Material UI used
* Infinite scroll should fetch databased on last fetched content createdAt date, not id
