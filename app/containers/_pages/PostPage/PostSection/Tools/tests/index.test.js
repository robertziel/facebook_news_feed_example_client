/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';

import { setCurrentUser } from 'containers/ApiConnector/actions';
import NotificationSystem from 'containers/NotificationsSystem';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import Tools from '../index';
import DeleteButton from '../../DeleteButton';

// Mock DeleteButton required by Tools index
/* eslint-disable react/prop-types */
jest.mock('containers/_pages/PostPage/PostSection/DeleteButton', () => () => (
  <div>DeleteButton</div>
));
/* eslint-enable */

const currentUser = { id: 23, name: 'User' };
const post = {
  id: 1,
  content: 'Content',
  title: 'Title',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    id: currentUser.id,
    name: 'User name',
  },
};

let store;
let wrapper;

function mountWrapper() {
  wrapper = mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <NotificationSystem />
              <Tools post={post} />
            </div>
          </ConnectedRouter>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

function configureStorage() {
  store = new ConfigureTestStore().store;
}

describe('<Tools />', () => {
  beforeEach(() => {
    configureStorage();
  });

  context('post author is currentUser', () => {
    beforeEach(() => {
      store.dispatch(setCurrentUser(currentUser));
      mountWrapper();
    });

    it('renders <DeleteButton /> with post param', () => {
      const deleteButtonElement = wrapper.find(DeleteButton);
      expect(deleteButtonElement.props().postId).toEqual(post.id);
    });
  });

  context('post author is not currentUser', () => {
    beforeEach(() => {
      store.dispatch(setCurrentUser({ id: currentUser.id + 1 }));
      mountWrapper();
    });

    it('renders null', () => {
      expect(wrapper.find(Tools).html()).toEqual('');
    });
  });
});
