import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import HomePage from '../Loadable';

// Mock Form required by HomePage
/* eslint-disable react/prop-types */
jest.mock('containers/_pages/HomePage/NewsFeeds/index', () => () => (
  <div>NewsFeeds</div>
));
/* eslint-enable */

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

function configureWrapper() {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper();
}

describe('<HomePage />', () => {
  beforeEach(() => {
    configureWrapper();
  });

  it('should render ActiveTokens', async () => {
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.text()).toContain('NewsFeeds');
    });
  });
});
