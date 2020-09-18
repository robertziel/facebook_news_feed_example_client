import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'components/_ui-elements';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import formattedDateTime from 'utils/formattedDateTime';

export default function PostContent({ post }) {
  const image = 'https://www.w3schools.com/w3images/avatar2.png';

  return (
    <Grid container>
      <Grid item md={12}>
        <Card>
          <CardHeader
            avatar={<Avatar src={image} />}
            title={post.user.name}
            subheader={formattedDateTime(post.createdAt)}
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="h1">
              {post.title}
            </Typography>
            <Typography variant="body2" component="span" align="center">
              {post.content}
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

PostContent.propTypes = {
  post: PropTypes.object.isRequired,
};
