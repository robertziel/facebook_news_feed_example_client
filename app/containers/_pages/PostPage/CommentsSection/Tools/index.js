import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currentUserSelector } from 'containers/ApiConnector/selectors';
import { createSelector } from 'reselect';

import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';
import Wrapper from './Wrapper';

function Tools({ afterDeleted, afterUpdated, currentUser, comment }) {
  if (comment.user.id === currentUser.id) {
    return (
      <Wrapper>
        <UpdateButton comment={comment} afterUpdated={afterUpdated} />
        <DeleteButton commentId={comment.id} afterDeleted={afterDeleted} />
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
  afterDeleted: PropTypes.func.isRequired,
  afterUpdated: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  comment: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Tools);
