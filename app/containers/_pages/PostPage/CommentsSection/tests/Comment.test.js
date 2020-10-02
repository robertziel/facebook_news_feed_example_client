/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import NotificationSystem from 'containers/NotificationsSystem';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import Comment from '../Comment';
import Reactions from '../Reactions';
import Tools from '../Tools';
import messages from '../messages';

/* eslint-disable react/prop-types */
// Mock Reactions required by Comment
jest.mock('containers/_pages/PostPage/CommentsSection/Reactions', () => () => (
  <div>Reactions</div>
));
// Mock Tools required by Comment
jest.mock('containers/_pages/PostPage/CommentsSection/Tools', () => () => (
  <div>Tools</div>
));
/* eslint-enable */

const comment = {
  id: 1,
  content: 'Content',
  createdAt: '2020-09-16T15:38:46+02:00',
  user: {
    name: 'User name',
  },
};

const updatedComment = {
  id: 1,
  content: 'Updated Content',
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
            <div>
              <NotificationSystem />
              <Comment comment={comment} />
            </div>
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

describe('<Comment />', () => {
  it('renders content', () => {
    configureWrapper();
    expect(wrapper.text()).toContain(comment.content);
  });

  it('renders <Reactions /> with comment in props', () => {
    configureWrapper();
    expect(wrapper.exists(Reactions)).toBe(true);
    expect(wrapper.find(Reactions).props().comment).toEqual(comment);
  });

  context('<Tools />', () => {
    beforeEach(() => {
      configureWrapper();
    });

    it('renders it once', () => {
      expect(wrapper.exists(Tools)).toBe(true);
    });

    context('which afterDeleted prop is called', () => {
      it('sets message removedComment', async () => {
        await act(async () => {
          wrapper.find(Tools).props().afterDeleted();
          await waitForExpect(() => {
            expect(wrapper.text()).toContain(
              messages.removedComment.defaultMessage,
            );
          });
        });
      });
    });

    context('which afterUpdated prop is called', () => {
      it('sets message removedComment', async () => {
        await act(async () => {
          wrapper.find(Tools).props().afterUpdated(updatedComment);
          await waitForExpect(() => {
            expect(wrapper.text()).toContain(updatedComment.content);
          });
        });
      });
    });
  });

  context('when has newTag defined', () => {
    beforeEach(() => {
      comment.newTag = true;
      configureWrapper();
    });

    it('renders new tag', () => {
      expect(wrapper.text()).toContain(messages.newTag.defaultMessage);
    });
  });

  context('when has newTag is not defined', () => {
    beforeEach(() => {
      comment.newTag = undefined;
      configureWrapper();
    });

    it('does not render new tag', () => {
      expect(wrapper.text()).not.toContain(messages.newTag.defaultMessage);
    });
  });
});
