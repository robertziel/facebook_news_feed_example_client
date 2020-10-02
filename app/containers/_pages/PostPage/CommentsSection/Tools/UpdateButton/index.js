import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';
import { Button } from 'components/_ui-elements';
import { Dialog } from '@material-ui/core';

import Form from './Form';

export default function UpdateButton({ comment, afterUpdated }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Form comment={comment} afterUpdated={afterUpdated} />
      </Dialog>
      <Button navbar aria-label="update" onClick={() => setOpenDialog(true)}>
        <FontAwesome name="edit" fontSize="medium" />
      </Button>
    </div>
  );
}

UpdateButton.propTypes = {
  comment: PropTypes.object.isRequired,
  afterUpdated: PropTypes.func.isRequired,
};
