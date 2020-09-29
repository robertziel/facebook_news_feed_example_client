/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import gql from 'graphql-tag';
import { execute, ApolloLink, Observable, fromError } from 'apollo-link';
import waitFor from 'wait-for-observables';
import waitForExpect from 'wait-for-expect';
import { mount } from 'enzyme';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import { notificationMessageSelector } from 'testsHelpers/notifications';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import NotificationSystem from 'containers/NotificationsSystem';
import mainLink from '../index';
import errorLinkMessages from '../errorLink/messages';
import * as connectionRefusedHandler from '../retryLink/connectionRefusedHandler';

// Mock htpLink so that it does nothing
jest.mock('apollo-link-http', () => ({
  ...jest.requireActual('apollo-link-http'),
  createHttpLink: () => {},
}));

const standardError = new Error('I never work');

const unauthorizedNotifySelector = notificationMessageSelector(
  errorLinkMessages.unauthorizedNotify.defaultMessage,
);

const query = gql`
  {
    sample {
      id
    }
  }
`;

let store;
let wrapper;

function mountWrapper() {
  wrapper = mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <NotificationSystem />
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

beforeAll(() => {
  store = new ConfigureTestStore().store;
  mountWrapper();
});

describe('#mainLink', () => {
  context('joins errorLink', () => {
    context('when no errors detected', () => {
      it('returns values', async () => {
        const data = { data: { hello: 'world' } };
        const stub = jest.fn(() => Observable.of(data));
        const link = ApolloLink.from([mainLink, stub]);

        const [{ values }] = await waitFor(execute(link, { query }));
        expect(values).toEqual([data]);
        expect(stub).toHaveBeenCalledTimes(1);
      });
    });

    context('when UTHENTICATION_ERROR detected', () => {
      it('signs out user', async () => {
        const data = {
          data: {},
          errors: [{ extensions: { code: 'AUTHENTICATION_ERROR' } }],
        };
        const stub = jest.fn(() => Observable.of(data));
        const link = ApolloLink.from([mainLink, stub]);

        await waitFor(execute(link, { query }));
        await waitForExpect(() => {
          expect(
            store.getState().backendApiConnector.authenticationToken,
          ).toEqual(null);
          expect(store.getState().backendApiConnector.currentUser).toEqual(
            null,
          );
        });
        await waitForExpect(() => {
          wrapper.update();
          expect(wrapper.exists(unauthorizedNotifySelector)).toBe(true);
        });
      });
    });
  });

  context('joins retryLink', () => {
    jest.spyOn(connectionRefusedHandler, 'reportConnectionRefused');
    jest.spyOn(connectionRefusedHandler, 'reportConnectionSucceeded');

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('returns data from the underlying link on a successful operation', async () => {
      const data = { data: { hello: 'world' } };
      const stub = jest.fn(() => Observable.of(data));
      const link = ApolloLink.from([mainLink, stub]);

      const [{ values }] = await waitFor(execute(link, { query }));
      expect(values).toEqual([data]);
      expect(stub).toHaveBeenCalledTimes(1);

      expect(
        connectionRefusedHandler.reportConnectionSucceeded,
      ).toHaveBeenCalled();
      expect(
        connectionRefusedHandler.reportConnectionRefused,
      ).not.toHaveBeenCalled();
    });

    it('returns data from the underlying link on a successful retry', async () => {
      const data = { data: { hello: 'world' } };
      const stubFail = jest.fn();
      const stubSuccess = jest.fn();
      stubFail.mockReturnValueOnce(fromError(standardError));
      stubFail.mockReturnValueOnce(Observable.of(data));
      stubSuccess.mockReturnValueOnce(Observable.of(data));
      const linkFail = ApolloLink.from([mainLink, stubFail]);
      const linkSuccess = ApolloLink.from([mainLink, stubSuccess]);

      // Promise failed link retries with success values
      let failedLinkRetryValues = [];
      const getPromise = async () => {
        const [{ values }] = await waitFor(execute(linkFail, { query }));
        failedLinkRetryValues = values;
      };
      getPromise();
      await waitFor(execute(linkSuccess, { query }));

      // Check if failed link returns values
      await waitForExpect(() => {
        expect(failedLinkRetryValues).toEqual([data]);
      });
      expect(stubSuccess).toHaveBeenCalledTimes(1);
      expect(stubFail).toHaveBeenCalledTimes(2);

      expect(
        connectionRefusedHandler.reportConnectionRefused,
      ).toHaveBeenCalledWith({ isMounted: true }, expect.any(Function));
      expect(
        connectionRefusedHandler.reportConnectionSucceeded,
      ).toHaveBeenCalledTimes(2);
    });

    it('does not retry if disableRetry is set true', async () => {
      const stubFail = jest.fn();
      stubFail.mockReturnValueOnce(fromError(standardError));
      const linkFail = ApolloLink.from([mainLink, stubFail]);

      // Promise failed link retries with success values
      await waitFor(
        execute(linkFail, {
          query,
          context: {
            disableRetry: true,
          },
        }),
      );

      // Check if failed link is called only once
      expect(stubFail).toHaveBeenCalledTimes(1);

      expect(
        connectionRefusedHandler.reportConnectionRefused,
      ).not.toHaveBeenCalledWith({ isMounted: true }, expect.any(Function));
      expect(
        connectionRefusedHandler.reportConnectionRefused,
      ).toHaveBeenCalledWith({ isMounted: true });
      expect(
        connectionRefusedHandler.reportConnectionSucceeded,
      ).not.toHaveBeenCalled();
    });
  });
});
