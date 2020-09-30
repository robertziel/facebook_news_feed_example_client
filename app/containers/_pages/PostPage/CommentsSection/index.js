import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Facebook } from 'react-content-loader';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'containers/ApiConnector/apollo/fetchers';
import { useSubscription } from '@apollo/client';
import { colors } from 'styles/constants';
import { CardContent } from '@material-ui/core';
import { Divider, Grid, Paper } from 'components/_ui-elements';

import Comment from './Comment';
import Form from './Form';
import Wrapper from './Wrapper';
import { COMMENTS_QUERY, COMMENT_ADDED_SUBSCRIPTION } from './graphql';
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

  useSubscription(COMMENT_ADDED_SUBSCRIPTION, {
    variables: {
      postId: post.id,
    },
    onSubscriptionData: (data) => {
      const newComment = data.subscriptionData.data.commentAdded;
      newComment.newTag = true;
      setComments([newComment, ...comments]);
    },
  });

  const renderComments = () =>
    comments.map((comment) => (
      <CSSTransition key={comment.id} timeout={500} classNames="item">
        <Grid>
          <Comment comment={comment} />
        </Grid>
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
    <Grid>
      <Paper comment>
        <CardContent>
          <FormattedMessage {...messages.scrollEnd} />
        </CardContent>
      </Paper>
    </Grid>
  );

  const loader = () => (
    <Grid>
      <Paper comment>
        <CardContent>
          <Facebook backgroundColor={colors.lightMain} />
        </CardContent>
      </Paper>
    </Grid>
  );

  return (
    <Wrapper>
      <Grid>
        <Divider />
        <br />
        <h2>
          <FormattedMessage {...messages.title} />
        </h2>
      </Grid>
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
