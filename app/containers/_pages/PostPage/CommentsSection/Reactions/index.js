import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { SubmitButton } from 'components/_ui-elements';
import FontAwesome from 'react-fontawesome';

import Wrapper from './Wrapper';
import { REACT_TO_COMMENT_MUTATION } from './graphql';

const like = 'like';
const smile = 'smile';
const thumbsUp = 'thumbsUp';

function Reactions({ comment }) {
  const [reactedWith, setReactedWith] = useState(
    comment.currentUserReactionType,
  );
  const [likesCount, setLikesCount] = useState(comment.likeReactionsCount);
  const [smilesCount, setSmilesCount] = useState(comment.smileReactionsCount);
  const [thumbsUpsCount, setThumbsUpsCount] = useState(
    comment.thumbsUpReactionsCount,
  );

  const [submitReaction, { loading }] = useMutation(REACT_TO_COMMENT_MUTATION, {
    context: {
      disableRetry: true,
    },
    variables: {
      id: comment.id,
      reactionType: reactedWith,
    },
    onCompleted: (data) => {
      setValues(data.commentReact.comment);
    },
  });

  const setValues = (data) => {
    setReactedWith(data.currentUserReactionType);
    setLikesCount(data.likeReactionsCount);
    setSmilesCount(data.smileReactionsCount);
    setThumbsUpsCount(data.thumbsUpReactionsCount);
  };

  const reactWith = async (reaction) => {
    await setReactedWith(reaction);
    submitReaction();
  };

  const activeClass = (reaction) => (reactedWith === reaction ? 'active' : '');

  return (
    <Wrapper>
      <SubmitButton
        navbar
        type={like}
        className={activeClass(like)}
        onClick={() => reactWith(like)}
        processing={loading}
        disableSpinner
      >
        <span className="count">{likesCount}</span>
        <FontAwesome name="heart" fontSize="large" />
      </SubmitButton>
      <SubmitButton
        navbar
        type={smile}
        className={activeClass(smile)}
        onClick={() => reactWith(smile)}
        processing={loading}
        disableSpinner
      >
        <span className="count">{smilesCount}</span>
        <FontAwesome name="smile-o" fontSize="large" />
      </SubmitButton>
      <SubmitButton
        navbar
        type={thumbsUp}
        className={activeClass(thumbsUp)}
        onClick={() => reactWith(thumbsUp)}
        processing={loading}
        disableSpinner
      >
        <span className="count">{thumbsUpsCount}</span>
        <FontAwesome name="thumbs-up" fontSize="large" />
      </SubmitButton>
    </Wrapper>
  );
}

Reactions.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Reactions;
