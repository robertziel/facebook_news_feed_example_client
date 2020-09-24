import React, { useState } from 'react';

import { useQuery } from 'containers/ApiConnector/apollo/fetchers';
import { useSubscription } from '@apollo/client';

import Post from './Post';
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
    posts.map((post) => <Post key={post.id} post={post} />);

  return <div>{renderPosts()}</div>;
}
