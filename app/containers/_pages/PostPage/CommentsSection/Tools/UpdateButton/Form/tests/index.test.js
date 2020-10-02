/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import NotificationSystem from 'containers/NotificationsSystem';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import { MockedProvider } from '@apollo/client/testing';
import { COMMENT_UPDATE_MUTATION } from '../graphql';

import Form from '../index';
import messages from '../messages';

const afterUpdated = jest.fn();

const commentObject = {
  id: 1,
  content: 'Content',
  title: 'Title',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    name: 'User name',
  },
};

const updatedCommentObject = {
  id: 1,
  content: 'Content',
  title: 'Title',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    name: 'User name',
  },
};

const mocks = (mockResponse) => [
  {
    request: {
      query: COMMENT_UPDATE_MUTATION,
      variables: {
        content: updatedCommentObject.content,
        id: updatedCommentObject.id,
      },
    },
    result: {
      data: {
        commentUpdate: mockResponse,
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
          <MockedProvider mocks={mocks(mockResponse)} addTypename={false}>
            <div>
              <NotificationSystem />
              <Form comment={commentObject} afterUpdated={afterUpdated} />
            </div>
          </MockedProvider>
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
      .simulate('change', { target: { value: updatedCommentObject.content } });
  });
  wrapper.find('button[type="submit"]').simulate('submit');
}

describe('<Form />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when update succeeded', () => {
    beforeEach(() => {
      configureWrapper({
        comment: updatedCommentObject,
        success: true,
        errors: [],
      });
    });

    it('adds success notification', async () => {
      await fillInAndSubmitForm();
      await act(async () => {
        await waitForExpect(() => {
          expect(wrapper.text()).toContain(
            messages.updatedNotify.defaultMessage,
          );
        });
      });
    });

    it('calls afterUpdated function with new comment data', async () => {
      await fillInAndSubmitForm();
      await act(async () => {
        await waitForExpect(() => {
          expect(afterUpdated).toHaveBeenCalledWith(updatedCommentObject);
        });
      });
    });
  });

  context('when update not succeeded', () => {
    beforeEach(() => {
      configureWrapper({
        comment: null,
        success: false,
        errors: errorMessages,
      });
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

    it('does not call afterUpdated function', async () => {
      await fillInAndSubmitForm();
      expect(afterUpdated).not.toHaveBeenCalled();
    });
  });
});
