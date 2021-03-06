/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Grid, H1 } from 'components/_ui-elements';

import Posts from './Posts';
import messages from './messages';

export default function HomePage() {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Divider />
      </Grid>
      <Grid item xs={12} md={5}>
        <Posts />
      </Grid>
    </Grid>
  );
}
