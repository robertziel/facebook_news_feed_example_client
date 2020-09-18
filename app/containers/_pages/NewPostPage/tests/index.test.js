import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import NewPostPage from '../Loadable';

// Mock Form required by NewPostPage
/* eslint-disable react/prop-types */
jest.mock('containers/_pages/NewPostPage/Form', () => () => <div>Form</div>);
/* eslint-enable */

function mountWrapper() {
  wrapper = mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <NewPostPage />
      </Provider>
    </IntlProvider>,
  );
}

let store;
let wrapper;

beforeAll(() => {
  store = new ConfigureTestStore().store;
  mountWrapper();
});

describe('<NewPostPage />', () => {
  it('should render <Form />', async () => {
    await act(async () => {
      waitForExpect(() => {
        wrapper.update();
        expect(wrapper.exists('Form')).toBe(true);
      });
    });
  });
});
