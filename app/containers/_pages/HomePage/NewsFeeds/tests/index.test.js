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

import NewsFeeds from '../index';
import { NEWS_FEEDS_QUERY } from '../graphql';

// Mock Form required by NewsFeeds
/* eslint-disable react/prop-types */
jest.mock(
  'containers/_pages/HomePage/NewsFeeds/NewsFeed',
  () => ({ newsFeed }) => <div>{newsFeed.content}</div>,
);
/* eslint-enable */

const resultNewsFeed = {
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

const mocks = () => [
  {
    request: {
      query: NEWS_FEEDS_QUERY,
    },
    result: {
      data: {
        newsFeeds: [resultNewsFeed],
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
              <NewsFeeds />
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

describe('<NewsFeeds />', () => {
  beforeEach(() => {
    configureWrapper();
  });

  it('should render NewsFeed with newsFeed in props', async () => {
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.text()).toContain(resultNewsFeed.content);
      });
    });
  });
});
