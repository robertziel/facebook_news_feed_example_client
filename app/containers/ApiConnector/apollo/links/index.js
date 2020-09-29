import { ApolloLink } from 'apollo-link';

import { contextLink } from './contextLink';
import { errorLink } from './errorLink';
import { retryLink } from './retryLink';
import { protocolLink } from './protocolLink';

const mainLink = ApolloLink.from([
  retryLink,
  errorLink,
  contextLink,
  protocolLink,
]);
export default mainLink;
