import React, { useState } from 'react';

import { useQuery } from 'containers/ApiConnector/apollo/fetchers';

import Post from './Post';
import { NEWS_FEEDS_QUERY } from './graphql';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useQuery(NEWS_FEEDS_QUERY, {
    onCompleted: (data) => {
      setPosts(data.posts);
    },
  });

  const renderPosts = () =>
    posts.map((post) => <Post key={post.id} post={post} />);

  return <div>{renderPosts()}</div>;
}
