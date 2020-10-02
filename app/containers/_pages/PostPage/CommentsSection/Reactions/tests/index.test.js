/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/client/testing';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import Reactions from '../index';
import { REACT_TO_COMMENT_MUTATION } from '../graphql';

const commentObject = {
  id: 1,
  currentUserReactionType: null,
  likeReactionsCount: 0,
  smileReactionsCount: 0,
  thumbsUpReactionsCount: 0,
};

const updatedCommentObject = {
  currentUserReactionType: null,
  likeReactionsCount: 3,
  smileReactionsCount: 5,
  thumbsUpReactionsCount: 6,
};

const mocks = (reaction) => [
  {
    request: {
      query: REACT_TO_COMMENT_MUTATION,
      variables: {
        id: commentObject.id,
        reactionType: reaction,
      },
    },
    result: {
      data: {
        commentReact: { comment: updatedCommentObject },
      },
    },
  },
];

let store;
let wrapper;

function mountWrapper(reaction) {
  wrapper = mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <MockedProvider mocks={mocks(reaction)} addTypename={false}>
            <Reactions comment={commentObject} />
          </MockedProvider>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

function configureWrapper(reaction) {
  store = new ConfigureTestStore().store;
  mountWrapper(reaction);
}

describe('<Reactions />', () => {
  ['like', 'smile', 'thumbsUp'].forEach((reaction) => {
    context(`when click ${reaction}`, () => {
      beforeEach(async () => {
        await act(async () => {
          await configureWrapper(reaction);
          wrapper.find(`button[type="${reaction}"]`).simulate('click');
        });
      });

      it(`sets temporarily reactedWith to ${reaction} and related button to active`, () => {
        expect(wrapper.exists(`button.active[type="${reaction}"]`)).toBe(true);
      });

      it('sets received reactions data back', async () => {
        await waitForExpect(() => {
          wrapper.update();
          expect(
            wrapper.exists(`button[type="${reaction}"]:not(.active)`),
          ).toBe(true);
          expect(wrapper.text()).toContain(
            updatedCommentObject.likeReactionsCount,
          );
          expect(wrapper.text()).toContain(
            updatedCommentObject.smileReactionsCount,
          );
          expect(wrapper.text()).toContain(
            updatedCommentObject.thumbsUpReactionsCount,
          );
        });
      });
    });
  });
});
