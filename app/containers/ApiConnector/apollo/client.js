import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { contextLink, errorLink, protocolLink, retryLink } from './links';

const link = ApolloLink.from([retryLink, errorLink, contextLink, protocolLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
