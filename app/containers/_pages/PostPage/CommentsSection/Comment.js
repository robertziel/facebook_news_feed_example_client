import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@material-ui/core';
import { Paper } from 'components/_ui-elements';
import formattedDateTime from 'utils/formattedDateTime';

import Reactions from './Reactions';
import Tools from './Tools';
import messages from './messages';

function Comment({ comment }) {
  const [commentContent, setCommentContent] = useState(comment);

  const newTag = () => {
    if (commentContent.newTag) {
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

  const removeComment = () => {
    setCommentContent(null);
  };

  const updateComment = (updatedComment) => {
    setCommentContent(updatedComment);
  };

  const renderComment = () => (
    <div>
      <Tools
        comment={comment}
        afterDeleted={removeComment}
        afterUpdated={updateComment}
      />
      {newTag()}

      <CardHeader
        avatar={<Avatar src={commentContent.user.avatar} />}
        title={commentContent.user.name}
        subheader={formattedDateTime(commentContent.createdAt)}
      ></CardHeader>
      <CardContent>
        <Typography component="span" align="center">
          {commentContent.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Reactions comment={comment} />
      </CardActions>
    </div>
  );

  const renderRemovedComment = () => (
    <Typography component="span" align="center">
      <FormattedMessage {...messages.removedComment} />
    </Typography>
  );

  return (
    <Paper comment>
      {commentContent ? renderComment() : renderRemovedComment()}
    </Paper>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
