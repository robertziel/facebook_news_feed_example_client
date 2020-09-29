import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@material-ui/core';
import messages from './messages';

function Comment({ comment }) {
  const date = new Date(comment.createdAt);

  const newTag = () => {
    if (comment.newTag) {
      return (
        <Chip
          className="new-tag"
          variant="outlined"
          size="small"
          label={<FormattedMessage {...messages.newTag} />}
        />
      );
    }
    return null;
  };

  return (
    <Card>
      {newTag()}

      <CardHeader
        avatar={<Avatar src={comment.user.avatar} />}
        title={comment.user.name}
        subheader={date.toDateString()}
      ></CardHeader>
      <CardContent>
        <Typography component="span" align="center">
          {comment.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
