/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import PaperCore from '@material-ui/core/Paper';

import styled, { css } from 'styled-components';

import { colors } from 'styles/constants';

const Paper = styled(({ comment, topLine, ...props }) => (
  <PaperCore {...props} />
))`
  &.MuiPaper-root {
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
      0 1px 3px 0 rgba(63, 63, 68, 0.15);
    background-color: #ffffff;
    padding: 10px;
    border-radius: 0%;
  }

  ${({ topLine }) =>
    topLine &&
    css`
      border-top: 4px solid ${colors.main};
    `}

  ${({ comment }) =>
    comment &&
    css`
      border: 5px #f3f6f8 solid;
    `}
`;

export { Paper };
