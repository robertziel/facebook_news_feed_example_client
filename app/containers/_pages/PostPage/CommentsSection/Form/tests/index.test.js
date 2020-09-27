/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import NotificationSystem from 'containers/NotificationsSystem';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import { MockedProvider } from '@apollo/client/testing';
import { COMMENT_CREATE_MUTATION } from '../graphql';

import Form from '../index';
import messages from '../messages';

const commentObject = {
  content: 'Content',
};
const postObject = {
  id: 1,
};

const mocks = (mockResponse) => [
  {
    request: {
      query: COMMENT_CREATE_MUTATION,
      variables: {
        content: commentObject.content,
        postId: postObject.id,
      },
    },
    result: {
      data: {
        commentCreate: mockResponse,
      },
    },
  },
];

const errorMessages = [
  { message: 'Content error', path: ['attributes', 'content'] },
];

let store;
let wrapper;

function mountWrapper(mockResponse) {
  wrapper = mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MockedProvider mocks={mocks(mockResponse)} addTypename={false}>
              <div>
                <NotificationSystem />
                <Form postId={postObject.id} />
              </div>
            </MockedProvider>
          </ConnectedRouter>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

async function configureWrapper(mockResponse) {
  store = new ConfigureTestStore().store;
  await mountWrapper(mockResponse);
}

async function fillInAndSubmitForm() {
  await act(async () => {
    wrapper
      .find('textarea[name="content"]')
      .simulate('change', { target: { value: commentObject.content } });
  });
  wrapper.find('button[type="submit"]').simulate('submit');
}

describe('<Form />', () => {
  context('when update succeeded', () => {
    beforeEach(() => {
      configureWrapper({ id: 1, success: true, errors: [] });
    });

    it('should add success notification', async () => {
      await fillInAndSubmitForm();
      await act(async () => {
        await waitForExpect(() => {
          expect(wrapper.text()).toContain(
            messages.createdNotify.defaultMessage,
          );
        });
      });
    });
  });

  context('when update not succeeded', () => {
    beforeEach(() => {
      configureWrapper({ id: null, success: false, errors: errorMessages });
    });

    it('should render an error messages with notification', async () => {
      await fillInAndSubmitForm();
      await act(async () => {
        await waitForExpect(() => {
          wrapper.update();
          errorMessages.forEach((error) => {
            expect(wrapper.contains(error.message)).toEqual(true);
          });
          expect(wrapper.text()).toContain(
            messages.notValidNotify.defaultMessage,
          );
        });
      });
    });
  });
});
