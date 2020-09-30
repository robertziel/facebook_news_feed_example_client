import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import formattedDateTime from 'utils/formattedDateTime';
import Tools from './Tools';

export default function PostSection({ post }) {
  return (
    <div>
      <Tools post={post} />
      <CardHeader
        avatar={<Avatar src={post.user.avatar} />}
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
        <Typography component="p" paragraph style={{ whiteSpace: 'pre-line' }}>
          {post.content}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </div>
  );
}

PostSection.propTypes = {
  post: PropTypes.object.isRequired,
};
