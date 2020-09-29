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
import { POST_DELETE_MUTATION } from '../graphql';

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

const post = {
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
      query: POST_DELETE_MUTATION,
      variables: {
        id: post.id,
      },
    },
    result: {
      data: {
        postDelete: { success: true },
      },
    },
  },
];

const examplePath = 'example-path';

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
                <DeleteButton postId={post.id} />
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
    history.location.pathname = examplePath;
    configureWrapper();
  });

  it('deletes post and redirects to root path', async () => {
    clickButton();
    clickDialogConfirm();
    await act(async () => {
      await waitForExpect(() => {
        expect(history.location.pathname).toEqual('/');
      });
    });
  });

  it('closes modal', () => {
    clickButton();
    clickDialogCancel();
    expect(history.location.pathname).toEqual(examplePath);
  });
});
