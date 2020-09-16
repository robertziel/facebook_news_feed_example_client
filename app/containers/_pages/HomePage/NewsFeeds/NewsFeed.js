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

function NewsFeed({ newsFeed }) {
  const image = 'https://www.w3schools.com/w3images/avatar2.png';

  const date = new Date(newsFeed.createdAt);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={image} />}
        title={newsFeed.user.name}
        subheader={date.toDateString()}
      />
      <CardActionArea onClick={() => history.push(`/news-feed/${newsFeed.id}`)}>
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="h2"
            align="center"
          >
            {newsFeed.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="span"
            align="center"
          >
            {newsFeed.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" component={Link} to={`/news-feed/${newsFeed.id}`}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

NewsFeed.propTypes = {
  newsFeed: PropTypes.object.isRequired,
};

export default NewsFeed;
