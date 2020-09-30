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
import { POST_UPDATE_MUTATION } from '../graphql';

import Form from '../index';
import messages from '../messages';

const postObject = {
  id: 1,
  content: 'Content',
  title: 'Title',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    id: 1,
  },
};

const postUpdatedObject = {
  id: postObject.id,
  content: 'New content',
  title: 'New title',
};

const mocks = (mockResponse) => [
  {
    request: {
      query: POST_UPDATE_MUTATION,
      variables: postUpdatedObject,
    },
    result: {
      data: {
        postUpdate: mockResponse,
      },
    },
  },
];

const errorMessages = [
  { message: 'Title error', path: ['attributes', 'title'] },
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
                <Form post={postObject} />
              </div>
            </MockedProvider>
          </ConnectedRouter>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

function configureWrapper(mockResponse) {
  store = new ConfigureTestStore().store;
  mountWrapper(mockResponse);
}

async function fillInAndSubmitForm() {
  await act(async () => {
    wrapper
      .find('textarea[name="content"]')
      .simulate('change', { target: { value: postUpdatedObject.content } });
    wrapper
      .find('input[name="title"]')
      .simulate('change', { target: { value: postUpdatedObject.title } });
  });
  wrapper.find('button[type="submit"]').simulate('submit');
}

describe('<Form />', () => {
  it('sets initial input values', () => {
    configureWrapper({});
    expect(
      wrapper.find(`textarea[name="content"]`).props().defaultValue,
    ).toEqual(postObject.content);
    expect(wrapper.find(`input[name="title"]`).props().defaultValue).toEqual(
      postObject.title,
    );
  });

  context('when update succeeded', () => {
    beforeEach(() => {
      configureWrapper({ id: 1, success: true, errors: [] });
    });

    it('adds success notification', async () => {
      await fillInAndSubmitForm();
      await act(async () => {
        await waitForExpect(() => {
          expect(wrapper.text()).toContain(
            messages.createdNotify.defaultMessage,
          );
        });
      });
    });

    it('redirects to /post/:id', async () => {
      await fillInAndSubmitForm();
      expect(history.location.pathname).toEqual(`/post/1`);
    });
  });

  context('when update not succeeded', () => {
    beforeEach(() => {
      configureWrapper({ id: null, success: false, errors: errorMessages });
    });

    it('renders an error messages with notification', async () => {
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
