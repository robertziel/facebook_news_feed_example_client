import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';

import NotificationSystem from 'containers/NotificationsSystem';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import PostSection from '../index';
import Tools from '../Tools';

// Mock Tools required by PostSection index
/* eslint-disable react/prop-types */
jest.mock('containers/_pages/PostPage/PostSection/Tools', () => () => (
  <div>Tools</div>
));
/* eslint-enable */

const post = {
  id: 1,
  content: 'Content',
  title: 'Title',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    name: 'User name',
  },
};

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <NotificationSystem />
              <PostSection post={post} />
            </div>
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

describe('<PostSection />', () => {
  beforeEach(() => {
    configureWrapper();
  });

  it('renders content', () => {
    expect(wrapper.text()).toContain(post.content);
  });

  it('renders <Tools /> with post param', () => {
    const deleteButtonElement = wrapper.find(Tools);
    expect(deleteButtonElement.props().post).toEqual(post);
  });
});
