import { ApolloClient, InMemoryCache } from '@apollo/client';
import mainLink from './links';

const client = new ApolloClient({
  link: mainLink,
  cache: new InMemoryCache(),
});

export default client;
