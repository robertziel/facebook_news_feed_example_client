/* eslint-disable indent */

import styled from 'styled-components';

const Wrapper = styled.div`
  .MuiPaper-root {
    margin-bottom: 10px;
  }

  .item-enter {
    opacity: 0;
    transform: scale(0);
  }
  .item-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity, transform 200ms ease-in;
  }
`;

export default Wrapper;
