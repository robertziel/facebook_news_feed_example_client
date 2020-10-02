import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Facebook } from 'react-content-loader';
import { FormattedMessage } from 'react-intl';
import { useSubscription, useQuery } from '@apollo/client';
import { colors } from 'styles/constants';
import { Card, CardContent } from '@material-ui/core';

import Post from './Post';
import Wrapper from './Wrapper';
import { POST_ADDED_SUBSCRIPTION, POSTS_QUERY } from './graphql';
import messages from './messages';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [moreToLoad, setMoreToLoad] = useState(true);

  const detectLastPost = (loadedPosts) => {
    if (loadedPosts.length === 0) {
      setMoreToLoad(false);
    }
  };

  useSubscription(POST_ADDED_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const newPost = data.subscriptionData.data.postAdded;
      newPost.newTag = true;
      setPosts([newPost, ...posts]);
    },
  });

  const { fetchMore } = useQuery(POSTS_QUERY, {
    onCompleted: (data) => {
      setPosts(data.posts);
      detectLastPost(data.posts);
    },
    fetchPolicy: 'network-only',
  });

  const renderPosts = () =>
    posts.map((post) => (
      <CSSTransition key={post.id} timeout={500} classNames="item">
        <Post post={post} />
      </CSSTransition>
    ));

  const handleLoadMore = () => {
    const lastPost = posts[posts.length - 1];

    if (lastPost) {
      fetchMore({
        variables: {
          olderThanId: lastPost.id,
        },
        updateQuery(previousResult, { fetchMoreResult }) {
          setPosts([...posts, ...fetchMoreResult.posts]);
          detectLastPost(fetchMoreResult.posts);
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
      <InfiniteScroll
        dataLength={posts.length}
        next={handleLoadMore}
        hasMore={moreToLoad}
        loader={loader()}
        endMessage={endMessage()}
        scrollableTarget="main-scroll"
      >
        <TransitionGroup>{renderPosts()}</TransitionGroup>
      </InfiniteScroll>
    </Wrapper>
  );
}
