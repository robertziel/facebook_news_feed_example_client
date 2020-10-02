import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/client';
import { currentUserSelector } from 'containers/ApiConnector/selectors';
import FetchedContent from 'containers/FetchedContent';
import { Divider, Grid, H1, Paper } from 'components/_ui-elements';

import { POST_QUERY } from './graphql';

import Form from './Form';
import messages from './messages';
import Wrapper from './Wrapper';

function UpdatePostPage({ currentUser }) {
  const history = useHistory();

  const { id } = useParams();
  const [post, setPost] = useState();

  useQuery(POST_QUERY, {
    variables: { id },
    onCompleted: (data) => {
      checkPostAuthorIsCurrentUser(data.post);
      setPost(data.post);
    },
  });

  const checkPostAuthorIsCurrentUser = (checkedPost) => {
    if (checkedPost.user.id !== currentUser.id) {
      history.push(`/post/${checkedPost.id}`);
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        <Divider />
      </Grid>
      <Grid item sm={12} md={10}>
        <Wrapper>
          <Paper topLine>
            <FetchedContent processing={post === undefined}>
              <Form post={post} />
            </FetchedContent>
          </Paper>
        </Wrapper>
      </Grid>
    </Grid>
  );
}

function mapStateToProps() {
  return createSelector(currentUserSelector(), (currentUser) => ({
    currentUser,
  }));
}

UpdatePostPage.propTypes = {
  currentUser: PropTypes.object,
};

export default connect(mapStateToProps)(UpdatePostPage);
