import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import history from 'utils/history';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@material-ui/core';
import messages from './messages';

function Post({ post }) {
  const image = 'https://www.w3schools.com/w3images/avatar2.png';

  const date = new Date(post.createdAt);

  const newTag = () => {
    if (post.newTag) {
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
        avatar={<Avatar src={image} />}
        title={post.user.name}
        subheader={date.toDateString()}
      ></CardHeader>
      <CardActionArea onClick={() => history.push(`/post/${post.id}`)}>
        <CardContent>
          <Typography gutterBottom component="h2">
            {`${post.id} ${post.title}`}
          </Typography>
          <Typography component="span" align="center">
            {post.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" component={Link} to={`/post/${post.id}`}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
