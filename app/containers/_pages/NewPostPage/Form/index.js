import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { Grid, SubmitButton, TextField } from 'components/_ui-elements';

import { useMutation } from '@apollo/client';
import prepareActiveModelErrors from 'utils/prepareActiveModelErrors';
import { POST_CREATE_MUTATION } from './graphql';

import messages from './messages';
import { createdNotify, notValidNotify } from './notifications';

function Form({ intl }) {
  const history = useHistory();
  // Form state
  const [errorMessages, setErrorMessages] = useState({});
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const [create, { loading }] = useMutation(POST_CREATE_MUTATION, {
    context: {
      disableRetry: true,
    },
    variables: {
      title,
      content,
    },
    onCompleted: (data) => {
      const feedback = data.postCreate;
      if (feedback.success) {
        createdNotify();
        setErrorMessages({});
        redirectAfterSuccess(feedback.id);
      } else {
        notValidNotify();
        setErrorMessages(prepareActiveModelErrors(feedback.errors));
      }
    },
  });

  const redirectAfterSuccess = (newPostId) => {
    history.push(`/post/${newPostId}`);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    create();
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <TextField
          defaultValue={title}
          label={intl.formatMessage(messages.formTitle)}
          type="text"
          name="title"
          onChange={(event) => setTitle(event.target.value)}
          variant="outlined"
          helperText={errorMessages.attributes_title}
          error={!!errorMessages.attributes_title}
          required
        />
      </Grid>
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
};

export default injectIntl(Form);
