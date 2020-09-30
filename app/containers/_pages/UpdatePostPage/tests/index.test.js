/* global context */

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
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import { setCurrentUser } from 'containers/ApiConnector/actions';
import Form from '../Form';
import UpdatePostPage from '../Loadable';
import { POST_QUERY } from '../graphql';

// Mock Form required by UpdatePostPage
/* eslint-disable react/prop-types */
jest.mock('containers/_pages/UpdatePostPage/Form', () => () => <div>Form</div>);
/* eslint-enable */

const currentUser = { id: 23, name: 'User' };
const postObject = {
  id: 1,
  content: 'Content',
  title: 'Title',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    id: currentUser.id,
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
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MemoryRouter initialEntries={['post/1/update']}>
            <Route path="post/:id/update">
              <MockedProvider mocks={mocks()} addTypename={false}>
                <UpdatePostPage />
              </MockedProvider>
            </Route>
          </MemoryRouter>
        </ConnectedRouter>
      </Provider>
    </IntlProvider>,
  );
}

let store;
let wrapper;

beforeAll(() => {
  store = new ConfigureTestStore().store;
  history.location.pathname = `/post/${postObject}/update`;
});

describe('<UpdatePostPage />', () => {
  context('post author is currentUser', () => {
    beforeAll(() => {
      store.dispatch(setCurrentUser(currentUser));
      mountWrapper();
    });

    it('renders <Form /> with post in props', async () => {
      await act(async () => {
        waitForExpect(() => {
          wrapper.update();
          expect(wrapper.exists(Form)).toBe(true);
          expect(wrapper.find(Form).props().post).toEqual(postObject);
          expect(history.location.pathname).toEqual(
            `/post/${postObject}/update`,
          );
        });
      });
    });
  });

  context('post author is not currentUser', () => {
    beforeAll(() => {
      store.dispatch(setCurrentUser({ id: 0 }));
      mountWrapper();
    });

    it('redirects to post page', async () => {
      await act(async () => {
        waitForExpect(() => {
          expect(history.location.pathname).toEqual(`/post/${postObject}`);
        });
      });
    });
  });
});
