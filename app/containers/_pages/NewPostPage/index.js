import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Container, Divider, Grid, H1, Paper } from 'components/_ui-elements';

import Form from './Form';
import messages from './messages';

function NewPostPage() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Paper topLine>
            <H1>
              <FormattedMessage {...messages.title} />
            </H1>
            <Divider />
            <Form />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewPostPage;
