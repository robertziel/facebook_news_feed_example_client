import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import UpdateButton from '../index';
import Form from '../Form';

// Mock Form required by UpdateButton
/* eslint-disable react/prop-types */
jest.mock(
  'containers/_pages/PostPage/CommentsSection/Tools/UpdateButton/Form',
  () => () => <div>Form</div>,
);
/* eslint-enable */

const afterUpdated = jest.fn();

async function clickButton() {
  await wrapper.find('button[aria-label="update"]').simulate('click');
}

async function clickDialogCancel() {
  await wrapper.find('button[aria-label="cancel"]').simulate('click');
}

const commentObject = {
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

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <UpdateButton comment={commentObject} afterUpdated={afterUpdated} />
          </ConnectedRouter>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

function configureWrapper() {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper();
}

describe('<DeleteButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    configureWrapper();
  });

  it('includes <Form /> with comment and updatedComment in props', async () => {
    let deleteButtonElement;

    clickButton();
    await act(async () => {
      await waitForExpect(() => {
        deleteButtonElement = wrapper.find(Form);
        expect(deleteButtonElement).not.toBeNull();
      });
    });

    expect(deleteButtonElement.props().comment).toEqual(commentObject);
    expect(afterUpdated).not.toHaveBeenCalled();
    deleteButtonElement.props().afterUpdated(commentObject);
    expect(afterUpdated).toHaveBeenCalledWith(commentObject);
  });

  it('closes modal', () => {
    clickButton();
    clickDialogCancel();
    expect(afterUpdated).not.toHaveBeenCalled();
  });
});
