import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import FetchedContent from 'containers/FetchedContent';
import { Grid, Paper } from 'components/_ui-elements';
import CommentsSection from './CommentsSection';
import PostSection from './PostSection';
import { POST_QUERY } from './graphql';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState();

  const { loading } = useQuery(POST_QUERY, {
    variables: { id },
    onCompleted: (data) => {
      setPost(data.post);
    },
    fetchPolicy: 'network-only',
  });

  return (
    <Grid container>
      <Grid item>
        <Paper topLine>
          <FetchedContent processing={post === undefined || loading}>
            <div>
              <PostSection post={post} />
              <CommentsSection post={post} />
            </div>
          </FetchedContent>
        </Paper>
      </Grid>
    </Grid>
  );
}
