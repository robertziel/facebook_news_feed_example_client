import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import App from '../index';

function shallowWrapper() {
  return shallow(<App store={store} />);
}

let store;
let wrapper;

beforeEach(() => {
  store = new ConfigureTestStore().store;
  wrapper = shallowWrapper();
});

describe('<App />', () => {
  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
