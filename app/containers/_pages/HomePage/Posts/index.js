import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useQuery } from 'containers/ApiConnector/apollo/fetchers';
import { useSubscription } from '@apollo/client';

import Post from './Post';
import Wrapper from './Wrapper';
import { POST_ADDED_SUBSCRIPTION, POSTS_QUERY } from './graphql';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useSubscription(POST_ADDED_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const newPost = data.subscriptionData.data.postAdded;
      setPosts([newPost, ...posts]);
    },
  });

  useQuery(POSTS_QUERY, {
    onCompleted: (data) => {
      setPosts(data.posts);
    },
    fetchPolicy: 'network-only',
  });

  const renderPosts = () =>
    posts.map((post) => (
      <CSSTransition key={post.id} timeout={500} classNames="item">
        <Post post={post} />
      </CSSTransition>
    ));

  return (
    <Wrapper>
      <TransitionGroup>{renderPosts()}</TransitionGroup>
    </Wrapper>
  );
}
