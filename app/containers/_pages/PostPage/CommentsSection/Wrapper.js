/* eslint-disable indent */

import styled from 'styled-components';

const Wrapper = styled.div`
  .MuiPaper-root {
    margin-bottom: 10px;

    .new-tag {
      float: right;
      margin-top: 15px;
      background: #597d38;
      border-color: #597d38;
      color: white;
      border-radius: 0px;
    }
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
