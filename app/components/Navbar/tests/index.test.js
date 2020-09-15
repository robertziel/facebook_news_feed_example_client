import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import Navbar from '../index';

// Mock LanguageToggle required by Navbar
/* eslint-disable react/prop-types */
jest.mock('components/LanguageToggle/index', () => () => (
  <div>LanguageToggle</div>
));
/* eslint-enable react/prop-types */

describe('<Navbar />', () => {
  it('should render and match the snapshot', () => {
    const { store } = new ConfigureTestStore();

    const wrapper = mount(
      <IntlProvider locale="en">
        <Provider store={store}>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </Provider>
      </IntlProvider>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
