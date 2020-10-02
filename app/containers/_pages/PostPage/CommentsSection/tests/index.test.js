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

import CommentsSection from '../index';
import { COMMENTS_QUERY, COMMENT_ADDED_SUBSCRIPTION } from '../graphql';
import messages from '../messages';

// Mock Form required by CommentsSection
/* eslint-disable react/prop-types */
jest.mock(
  'containers/_pages/PostPage/CommentsSection/Comment',
  () => ({ comment }) => (
    <div>
      Comment component {comment.content} {comment.newTag ? 'newTag' : null}
    </div>
  ),
);
// Mock Comment required by CommentsSection
jest.mock('containers/_pages/PostPage/CommentsSection/Form', () => () => (
  <div>Form component</div>
));
/* eslint-enable */

// Posts
const postObject = {
  id: 1,
  content: 'Content',
  title: 'Title',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    name: 'User name',
  },
};

// Comments
const resultComment = {
  id: 2,
  content: 'resultCommentContent',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    id: 1,
    avatar: 'http://example-avatar.jpg',
    name: 'resultCommentUserName',
  },
};
const loadedOnScrollComment = {
  id: 1,
  content: 'loadedOnScrollCommentContent',
  createdAt: '2020-10-16T15:38:46+02:00',
  user: {
    id: 1,
    avatar: 'http://example-avatar.jpg',
    name: 'loadedOnScrollCommentUserName',
  },
};
const transmittedComment = {
  id: 3,
  content: 'transmittedCommentContent',
  createdAt: '2020-10-16T15:38:46+02:00',
  user: {
    id: 1,
    avatar: 'http://example-avatar.jpg',
    name: 'transmittedCommentUserName',
  },
};
let store;
let wrapper;

const mocks = (opts) => [
  {
    request: {
      query: COMMENTS_QUERY,
      variables: {
        postId: postObject.id,
      },
    },
    result: {
      data: {
        comments: { moreToLoad: opts.moreComments, comments: [resultComment] },
      },
    },
  },
  {
    request: {
      query: COMMENTS_QUERY,
      variables: {
        postId: postObject.id,
      },
    },
    result: {
      data: {
        comments: { moreToLoad: opts.moreComments, comments: [resultComment] },
      },
    },
  }, // fetchPolicy: 'network-only' calls useQuery again during fetchMore, hopefully it is fixed soon : https://github.com/apollographql/apollo-client/issues/6327
  {
    request: {
      query: COMMENTS_QUERY,
      variables: {
        olderThanId: transmittedComment.id,
        postId: postObject.id,
      },
    },
    result: {
      data: {
        comments: {
          moreToLoad: opts.moreCommentsOnScrollLoad,
          comments: [loadedOnScrollComment],
        },
      },
    },
  },
  {
    request: {
      query: COMMENT_ADDED_SUBSCRIPTION,
      variables: {
        postId: postObject.id,
      },
    },
    result: {
      data: {
        commentAdded: transmittedComment,
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
              <CommentsSection post={postObject} />
            </div>
          </MockedProvider>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

function configureWrapper(opts = {}) {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper(opts);
}

describe('<CommentsSection />', () => {
  it('renders Form component', async () => {
    configureWrapper();
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.text()).toContain('Form component');
      });
    });
  });

  context('when comment is returned by COMMENTS_QUERY', () => {
    beforeEach(() => {
      configureWrapper({ moreComments: true });
    });

    it('renders Comment with comment in props', async () => {
      await act(async () => {
        await waitForExpect(() => {
          wrapper.update();
          expect(wrapper.text()).toContain(
            `Comment component ${resultComment.content}`,
          );
        });
      });
    });

    it('renders transmitted new post with new tag', async () => {
      await act(async () => {
        await waitForExpect(() => {
          wrapper.update();
          expect(wrapper.text()).toContain(
            `Comment component ${transmittedComment.content} newTag`,
          );
        });
      });
    });

    context('when comment is returned by COMMENTS_QUERY on fetchMore', () => {
      beforeEach(() => {
        configureWrapper({
          moreComments: true,
          moreCommentsOnScrollLoad: true,
        });
      });

      it('renders loaded Comment with comment in props', async () => {
        await act(async () => {
          // check if first query loaded before fetchMore
          await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.text()).toContain(
              `Comment component ${resultComment.content}`,
            );
          });
          const infiniteScroll = wrapper.find('InfiniteScroll');
          infiniteScroll.props().next(); // fetchMore
          await waitForExpect(() => {
            expect(wrapper.text()).toContain(
              `Comment component ${loadedOnScrollComment.content}`,
            );
          });
        });
      });
    });

    context(
      'when empty array is returned by COMMENTS_QUERY on fetchMore',
      () => {
        beforeEach(() => {
          configureWrapper({ moreComments: true });
        });

        it('renders scrollEnd message', async () => {
          await act(async () => {
            // check if first query loaded before fetchMore
            await waitForExpect(() => {
              wrapper.update();
              expect(wrapper.text()).toContain(
                `Comment component ${resultComment.content}`,
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
      },
    );
  });

  context('when empty array is returned by COMMENTS_QUERY', () => {
    beforeEach(() => {
      configureWrapper({ moreComments: false });
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
