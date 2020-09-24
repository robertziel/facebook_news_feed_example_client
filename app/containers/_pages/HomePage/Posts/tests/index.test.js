import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';

import NotificationSystem from 'containers/NotificationsSystem';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import { MockedProvider } from '@apollo/client/testing';

import Posts from '../index';
import { POST_ADDED_SUBSCRIPTION, POSTS_QUERY } from '../graphql';

// Mock Form required by Posts
/* eslint-disable react/prop-types */
jest.mock('containers/_pages/HomePage/Posts/Post', () => ({ post }) => (
  <div>
    Post component {post.content} {post.newTag ? 'newTag' : null}
  </div>
));
/* eslint-enable */

const resultPost = {
  id: 1,
  content: 'Content',
  title: 'Title',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    name: 'User name',
  },
};
const transmittedPost = {
  id: 2,
  content: 'Content 2',
  title: 'Title 2',
  createdAt: '2020-10-16T15:38:46+02:00',
  user: {
    name: 'User name 2',
  },
};
let store;
let wrapper;

const mocks = () => [
  {
    request: {
      query: POSTS_QUERY,
    },
    result: {
      data: {
        posts: [resultPost],
      },
    },
  },
  {
    request: {
      query: POST_ADDED_SUBSCRIPTION,
    },
    result: {
      data: {
        postAdded: transmittedPost,
      },
    },
  },
];

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <MockedProvider mocks={mocks()} addTypename={false}>
            <div>
              <NotificationSystem />
              <Posts />
            </div>
          </MockedProvider>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

function configureWrapper() {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper();
}

describe('<Posts />', () => {
  beforeEach(() => {
    configureWrapper();
  });

  it('renders Post with post in props', async () => {
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.text()).toContain(
          `Post component ${resultPost.content}`,
        );
      });
    });
  });

  it('renders transmitted new post with new tag', async () => {
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.text()).toContain(
          `Post component ${transmittedPost.content} newTag`,
        );
      });
    });
  });
});
