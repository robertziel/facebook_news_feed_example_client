import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import { Button, SubmitButton } from 'components/_ui-elements';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { useMutation } from 'containers/ApiConnector/apollo/fetchers';

import { POST_DELETE_MUTATION } from './graphql';
import messages from './messages';

export default function DeleteButton({ postId }) {
  const history = useHistory();

  const [openDialog, setOpenDialog] = useState(false);

  const [deletePost, { loading }] = useMutation(POST_DELETE_MUTATION, {
    context: {
      disableRetry: true,
    },
    variables: {
      id: postId,
    },
    onCompleted: () => {
      redirectAfterSuccess();
    },
  });

  const redirectAfterSuccess = () => {
    history.push('/');
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage {...messages.dialogTitle} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage {...messages.dialogExplanation} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button aria-label="cancel" onClick={closeDialog} color="primary">
            <FormattedMessage {...messages.dialogCancel} />
          </Button>
          <SubmitButton
            onClick={deletePost}
            processing={loading}
            color="secondary"
          >
            <FormattedMessage {...messages.dialogConfirm} />
          </SubmitButton>
        </DialogActions>
      </Dialog>
      <Button
        color="secondary"
        navbar
        aria-label="delete"
        onClick={() => setOpenDialog(true)}
      >
        <DeleteIcon fontSize="large" />
      </Button>
    </div>
  );
}

DeleteButton.propTypes = {
  postId: PropTypes.number.isRequired,
};
