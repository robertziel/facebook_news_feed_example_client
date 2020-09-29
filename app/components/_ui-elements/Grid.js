/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import GridCore from '@material-ui/core/Grid';

import styled from 'styled-components';

const Grid = styled(({ ...props }) => <GridCore {...props} />)`
  padding: 10px;
`;

export { Grid };
