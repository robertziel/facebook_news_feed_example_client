import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Grid, H1, Paper } from 'components/_ui-elements';

import Form from './Form';
import messages from './messages';

function NewPostPage() {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        <Divider />
      </Grid>
      <Grid item sm={12} md={10}>
        <Paper topLine>
          <Form />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default NewPostPage;
