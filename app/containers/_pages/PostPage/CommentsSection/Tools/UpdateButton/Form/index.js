import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Grid, SubmitButton, TextField } from 'components/_ui-elements';

import { useMutation } from 'containers/ApiConnector/apollo/fetchers';
import prepareActiveModelErrors from 'utils/prepareActiveModelErrors';
import { COMMENT_UPDATE_MUTATION } from './graphql';

import messages from './messages';
import { updatedNotify, notValidNotify } from './notifications';

function Form({ intl, comment, afterUpdated }) {
  // Form state
  const [errorMessages, setErrorMessages] = useState({});
  const [content, setContent] = useState(comment.content);

  const [update, { loading }] = useMutation(COMMENT_UPDATE_MUTATION, {
    context: {
      disableRetry: true,
    },
    variables: {
      id: comment.id,
      content,
    },
    onCompleted: (data) => {
      const feedback = data.commentUpdate;
      if (feedback.success) {
        afterUpdated(feedback.comment);
        updatedNotify();
        setErrorMessages({});
      } else {
        notValidNotify();
        setErrorMessages(prepareActiveModelErrors(feedback.errors));
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    update();
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
  comment: PropTypes.object.isRequired,
  afterUpdated: PropTypes.func.isRequired,
};

export default injectIntl(Form);
