import ActionCable from 'actioncable';
import { ActionCableLink } from 'graphql-ruby-client';
import StoreAccessor from '../../../StoreAccessor';

function getAuthenticationToken() {
  if (StoreAccessor.store === undefined) {
    return null;
  }
  return StoreAccessor.store.getState().backendApiConnector.authenticationToken;
}

const cable = ActionCable.createConsumer(`ws://localhost:8080/cable`);
const wsLink = new ActionCableLink({ cable });

export const restartActionCableConnection = () => {
  wsLink.connectionParams = { authToken: getAuthenticationToken() };
  if (wsLink.subscriptionClient) {
    wsLink.subscriptionClient.tryReconnect();
  }
};

export default wsLink;
