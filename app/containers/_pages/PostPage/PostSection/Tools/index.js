import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currentUserSelector } from 'containers/ApiConnector/selectors';
import { createSelector } from 'reselect';

import { NavLink } from 'react-router-dom';
import { Button } from 'components/_ui-elements';
import FontAwesome from 'react-fontawesome';

import DeleteButton from '../DeleteButton';
import Wrapper from './Wrapper';

function Tools({ currentUser, post }) {
  if (post.user.id === currentUser.id) {
    return (
      <Wrapper>
        <Button navbar component={NavLink} exact to={`/post/${post.id}/update`}>
          <FontAwesome name="edit" fontSize="large" />
        </Button>
        <DeleteButton postId={post.id} />
      </Wrapper>
    );
  }
  return null;
}

function mapStateToProps() {
  return createSelector(currentUserSelector(), (currentUser) => ({
    currentUser,
  }));
}

Tools.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Tools);
