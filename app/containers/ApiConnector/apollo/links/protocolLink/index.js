import { ApolloLink } from 'apollo-link';

import httpLink from './httpLink';
import wsLink from './wsLink';

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription',
  );

export const protocolLink = ApolloLink.split(
  hasSubscriptionOperation,
  wsLink,
  httpLink,
);
