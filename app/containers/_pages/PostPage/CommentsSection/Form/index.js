import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Grid, SubmitButton, TextField } from 'components/_ui-elements';

import { useMutation } from '@apollo/client';
import prepareActiveModelErrors from 'utils/prepareActiveModelErrors';
import { COMMENT_CREATE_MUTATION } from './graphql';

import messages from './messages';
import { createdNotify, notValidNotify } from './notifications';

function Form({ intl, postId }) {
  // Form state
  const [errorMessages, setErrorMessages] = useState({});
  const [content, setContent] = useState(null);

  const [create, { loading }] = useMutation(COMMENT_CREATE_MUTATION, {
    context: {
      disableRetry: true,
    },
    variables: {
      content,
      postId,
    },
    onCompleted: (data) => {
      const feedback = data.commentCreate;
      if (feedback.success) {
        createdNotify();
        setErrorMessages({});
      } else {
        notValidNotify();
        setErrorMessages(prepareActiveModelErrors(feedback.errors));
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    create();
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <TextField
          defaultValue={content}
          label={intl.formatMessage(messages.formContent)}
          type="text"
          name="content"
          onChange={(event) => setContent(event.target.value)}
          variant="outlined"
          helperText={errorMessages.attributes_content}
          error={!!errorMessages.attributes_content}
          multiline
          required
        />
      </Grid>
      <Grid>
        <SubmitButton processing={loading}>
          <FormattedMessage {...messages.formButton} />
        </SubmitButton>
      </Grid>
    </form>
  );
}

Form.propTypes = {
  intl: intlShape.isRequired,
  postId: PropTypes.number.isRequired,
};

export default injectIntl(Form);
