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
import DeleteButton from '../DeleteButton';
import UpdateButton from '../UpdateButton';

/* eslint-disable react/prop-types */
// Mock DeleteButton required by Tools index
jest.mock(
  'containers/_pages/PostPage/CommentsSection/Tools/DeleteButton',
  () => () => <div>UpdateButton</div>,
);
// Mock UpdateButton required by Tools index
jest.mock(
  'containers/_pages/PostPage/CommentsSection/Tools/UpdateButton',
  () => () => <div>DeleteButton</div>,
);
/* eslint-enable */

const currentUser = { id: 23, name: 'User' };
const comment = {
  id: 1,
  content: 'Content',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    id: currentUser.id,
    name: 'User name',
  },
};
const updatedComment = {
  id: 1,
  content: 'Updated comment',
};

const afterDeleted = jest.fn();
const afterUpdated = jest.fn();

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
              <Tools
                comment={comment}
                afterDeleted={afterDeleted}
                afterUpdated={afterUpdated}
              />
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
    jest.clearAllMocks();
    configureStorage();
  });

  context('comment author is currentUser', () => {
    beforeEach(() => {
      store.dispatch(setCurrentUser(currentUser));
      mountWrapper();
    });

    it('renders <DeleteButton /> with commentId param and afterDeleted function', () => {
      const deleteButtonElement = wrapper.find(DeleteButton);
      expect(deleteButtonElement.props().commentId).toEqual(comment.id);
      expect(afterDeleted).toHaveBeenCalledTimes(0);
      deleteButtonElement.props().afterDeleted();
      expect(afterDeleted).toHaveBeenCalledTimes(1);
    });

    it('renders <UpdateButton /> with comment param and afterUpdated function', () => {
      const deleteButtonElement = wrapper.find(UpdateButton);
      expect(deleteButtonElement.props().comment).toEqual(comment);
      expect(afterUpdated).not.toHaveBeenCalled();
      deleteButtonElement.props().afterUpdated(updatedComment);
      expect(afterUpdated).toHaveBeenCalledWith(updatedComment);
    });
  });

  context('comment author is not currentUser', () => {
    beforeEach(() => {
      store.dispatch(setCurrentUser({ id: currentUser.id + 1 }));
      mountWrapper();
    });

    it('renders null', () => {
      expect(wrapper.find(Tools).html()).toEqual('');
    });
  });
});
