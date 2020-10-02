/* global context */

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
import messages from '../messages';

// Mock Form required by Posts
/* eslint-disable react/prop-types */
jest.mock('containers/_pages/HomePage/Posts/Post', () => ({ post }) => (
  <div>
    Post component {post.content} {post.newTag ? 'newTag' : null}
  </div>
));
/* eslint-enable */

const resultPost = {
  id: 2,
  content: 'resultPostContent',
  title: 'resultPostTitle',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    name: 'resultPostUserName',
  },
};
const transmittedPost = {
  id: 3,
  content: 'transmittedPostContent',
  title: 'transmittedPostTitle',
  createdAt: '2020-10-16T15:38:46+02:00',
  user: {
    name: 'transmittedPostUserName',
  },
};
const loadedOnScrollPost = {
  id: 1,
  content: 'loadedOnScrollPostContent',
  title: 'loadedOnScrollPostTitle',
  createdAt: '2020-10-16T15:38:46+02:00',
  user: {
    name: 'loadedOnScrollPostUserName',
  },
};
let store;
let wrapper;

const mocks = (opts) => [
  {
    request: {
      query: POSTS_QUERY,
    },
    result: {
      data: {
        posts: { moreToLoad: opts.morePosts, posts: [resultPost] },
      },
    },
  },
  {
    request: {
      query: POSTS_QUERY,
    },
    result: {
      data: {
        posts: { moreToLoad: opts.morePosts, posts: [resultPost] },
      },
    },
  }, // fetchPolicy: 'network-only' calls useQuery again during fetchMore, hopefully it is fixed soon : https://github.com/apollographql/apollo-client/issues/6327
  {
    request: {
      query: POSTS_QUERY,
      variables: {
        olderThanId: transmittedPost.id,
      },
    },
    result: {
      data: {
        posts: {
          moreToLoad: opts.morePostsOnScrollLoad,
          posts: [loadedOnScrollPost],
        },
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

function mountWrapper(opts) {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <MockedProvider mocks={mocks(opts)} addTypename={false}>
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

function configureWrapper(opts) {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper(opts);
}

describe('<Posts />', () => {
  context('when post is returned by POSTS_QUERY', () => {
    beforeEach(() => {
      configureWrapper({ morePosts: true });
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

    context('when post is returned by POSTS_QUERY on fetchMore', () => {
      beforeEach(() => {
        configureWrapper({ morePosts: true, morePostsOnScrollLoad: true });
      });

      it('renders loaded Post with post in props', async () => {
        await act(async () => {
          // check if first query loaded before fetchMore
          await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.text()).toContain(
              `Post component ${resultPost.content}`,
            );
          });
          const infiniteScroll = wrapper.find('InfiniteScroll');
          infiniteScroll.props().next(); // fetchMore
          await waitForExpect(() => {
            expect(wrapper.text()).toContain(
              `Post component ${loadedOnScrollPost.content}`,
            );
          });
        });
      });
    });

    context('when empty array is returned by POSTS_QUERY on fetchMore', () => {
      beforeEach(() => {
        configureWrapper({ morePosts: true });
      });

      it('renders scrollEnd message', async () => {
        await act(async () => {
          // check if first query loaded before fetchMore
          await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.text()).toContain(
              `Post component ${resultPost.content}`,
            );
          });
          const infiniteScroll = wrapper.find('InfiniteScroll');
          infiniteScroll.props().next(); // fetchMore
          await act(async () => {
            await waitForExpect(() => {
              wrapper.update();
              expect(wrapper.text()).toContain(
                messages.scrollEnd.defaultMessage,
              );
            });
          });
        });
      });
    });
  });

  context('when empty array is returned by POSTS_QUERY', () => {
    beforeEach(() => {
      configureWrapper({ morePosts: false });
    });

    it('renders scrollEnd message', async () => {
      await act(async () => {
        await waitForExpect(() => {
          wrapper.update();
          expect(wrapper.text()).toContain(messages.scrollEnd.defaultMessage);
        });
      });
    });
  });
});
