import React from 'react';
import PropTypes from 'prop-types';
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
  Typography,
} from '@material-ui/core';

function Post({ post }) {
  const image = 'https://www.w3schools.com/w3images/avatar2.png';

  const date = new Date(post.createdAt);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={image} />}
        title={post.user.name}
        subheader={date.toDateString()}
      />
      <CardActionArea onClick={() => history.push(`/post/${post.id}`)}>
        <CardContent>
          <Typography gutterBottom component="h2">
            {post.title}
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
