import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Facebook } from 'react-content-loader';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'containers/ApiConnector/apollo/fetchers';
import { colors } from 'styles/constants';
import { Card, CardContent } from '@material-ui/core';

import Comment from './Comment';
import Form from './Form';
import Wrapper from './Wrapper';
import { COMMENTS_QUERY } from './graphql';
import messages from './messages';

export default function CommentsSection({ post }) {
  const [comments, setComments] = useState([]);
  const [moreToLoad, setMoreToLoad] = useState(true);

  const detectLastComment = (loadedComments) => {
    if (loadedComments.length === 0) {
      setMoreToLoad(false);
    }
  };

  const { fetchMore } = useQuery(COMMENTS_QUERY, {
    variables: {
      postId: post.id,
    },
    onCompleted: (data) => {
      setComments(data.comments);
      detectLastComment(data.comments);
    },
    fetchPolicy: 'network-only',
  });

  const renderComments = () =>
    comments.map((comment) => (
      <CSSTransition key={comment.id} timeout={500} classNames="item">
        <Comment comment={comment} />
      </CSSTransition>
    ));

  const handleLoadMore = () => {
    const lastComment = comments[comments.length - 1];

    if (lastComment) {
      fetchMore({
        variables: {
          olderThanId: lastComment.id,
          postId: post.id,
        },
        updateQuery(previousResult, { fetchMoreResult }) {
          setComments([...comments, ...fetchMoreResult.comments]);
          detectLastComment(fetchMoreResult.comments);
        },
      });
    }
  };

  const endMessage = () => (
    <Card>
      <CardContent>
        <FormattedMessage {...messages.scrollEnd} />
      </CardContent>
    </Card>
  );

  const loader = () => (
    <Card>
      <CardContent>
        <Facebook backgroundColor={colors.lightMain} />
      </CardContent>
    </Card>
  );

  return (
    <Wrapper>
      <Form postId={post.id} />
      <InfiniteScroll
        dataLength={comments.length}
        next={handleLoadMore}
        hasMore={moreToLoad}
        loader={loader()}
        endMessage={endMessage()}
      >
        <TransitionGroup>{renderComments()}</TransitionGroup>
      </InfiniteScroll>
    </Wrapper>
  );
}

CommentsSection.propTypes = {
  post: PropTypes.object.isRequired,
};
