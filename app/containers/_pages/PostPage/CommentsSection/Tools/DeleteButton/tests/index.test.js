import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';

import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import NotificationSystem from 'containers/NotificationsSystem';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import DeleteButton from '../index';
import { COMMENT_DELETE_MUTATION } from '../graphql';

async function clickButton() {
  await wrapper.find('button[aria-label="delete"]').simulate('click');
}

async function clickDialogCancel() {
  await wrapper.find('button[aria-label="cancel"]').simulate('click');
}

async function clickDialogConfirm() {
  await wrapper
    .find('.MuiDialogActions-root button[type="submit"]')
    .simulate('click');
}

const comment = {
  id: 1,
  content: 'Content',
  title: 'Title',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    name: 'User name',
  },
};

const mocks = () => [
  {
    request: {
      query: COMMENT_DELETE_MUTATION,
      variables: {
        id: comment.id,
      },
    },
    result: {
      data: {
        commentDelete: { success: true },
      },
    },
  },
];

const afterDeleted = jest.fn();

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MockedProvider mocks={mocks()} addTypename={false}>
              <div>
                <NotificationSystem />
                <DeleteButton
                  commentId={comment.id}
                  afterDeleted={afterDeleted}
                />
              </div>
            </MockedProvider>
          </ConnectedRouter>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

function configureWrapper() {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper();
}

describe('<DeleteButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    configureWrapper();
  });

  it('deletes comment and redirects to root path', async () => {
    clickButton();
    clickDialogConfirm();
    await act(async () => {
      await waitForExpect(() => {
        expect(afterDeleted).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('closes modal', () => {
    clickButton();
    clickDialogCancel();
    expect(afterDeleted).toHaveBeenCalledTimes(0);
  });
});
