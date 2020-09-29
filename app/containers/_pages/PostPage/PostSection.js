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

export default function PostSection({ post }) {
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
            <Typography
              gutterBottom
              component="h1"
              style={{ fontSize: '25px' }}
              align="center"
            >
              {post.title}
            </Typography>
            <Typography
              component="p"
              paragraph
              style={{ whiteSpace: 'pre-line' }}
            >
              {post.content}
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

PostSection.propTypes = {
  post: PropTypes.object.isRequired,
};
