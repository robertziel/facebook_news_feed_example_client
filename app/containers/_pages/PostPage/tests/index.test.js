import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { MockedProvider } from '@apollo/client/testing';
import { Route, MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import CommentsSection from '../CommentsSection';
import PostSection from '../PostSection';
import PostPage from '../Loadable';
import { POST_QUERY } from '../graphql';

/* eslint-disable react/prop-types */
// Mock PostSection required by PostPage
jest.mock('containers/_pages/PostPage/PostSection', () => () => (
  <div>PostSection</div>
));
// Mock CommentsSection required by PostPage
jest.mock('containers/_pages/PostPage/CommentsSection', () => () => (
  <div>CommentsSection</div>
));
/* eslint-enable */

let store;
let wrapper;

const postObject = {
  id: 1,
  content: 'Content',
  title: 'Title',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    id: 1,
    avatar: 'http://image.jpg/',
    name: 'User name',
  },
};

const mocks = () => [
  {
    request: {
      query: POST_QUERY,
      variables: {
        id: postObject.id.toString(),
      },
    },
    result: {
      data: {
        post: postObject,
      },
    },
  },
];

function mountWrapper() {
  wrapper = mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MemoryRouter initialEntries={['post/1']}>
              <Route path="post/:id">
                <MockedProvider mocks={mocks()} addTypename={false}>
                  <PostPage />
                </MockedProvider>
              </Route>
            </MemoryRouter>
          </ConnectedRouter>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

async function configureWrapper() {
  store = new ConfigureTestStore().store;
  await mountWrapper();
}

describe('<PostPage />', () => {
  beforeEach(() => {
    configureWrapper();
  });

  it('should render PostSection with post passed in props', async () => {
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.exists(PostSection)).toBe(true);
        expect(wrapper.find(PostSection).props().post).toEqual(postObject);
      });
    });
  });

  it('should render CommentsSection with post passed in props', async () => {
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.exists(CommentsSection)).toBe(true);
        expect(wrapper.find(CommentsSection).props().post).toEqual(postObject);
      });
    });
  });
});
