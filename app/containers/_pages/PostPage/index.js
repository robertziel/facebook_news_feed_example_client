import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'containers/ApiConnector/apollo/fetchers';
import FetchedContent from 'containers/FetchedContent';
import PostContent from './PostContent';
import { POST_QUERY } from './graphql';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState();

  const { loading } = useQuery(POST_QUERY, {
    variables: { id },
    onCompleted: (data) => {
      setPost(data.post);
    },
  });

  return (
    <FetchedContent processing={post === undefined || loading}>
      <PostContent post={post} />
    </FetchedContent>
  );
}
