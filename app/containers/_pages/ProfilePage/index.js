import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Grid, H1 } from 'components/_ui-elements';

import ProfileForm from './ProfileForm';
import messages from './messages';

export default function ProfilePage() {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Divider />
      </Grid>
      <Grid item sm={12} md={6}>
        <ProfileForm />
      </Grid>
    </Grid>
  );
}
