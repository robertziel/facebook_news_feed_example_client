import React from 'react';
import PropTypes from 'prop-types';

import { HollowDotsSpinner } from 'react-epic-spinners';
import { colors } from 'styles/constants';
import { Button } from '../Button';

function SubmitButton({
  children,
  color,
  onClick,
  navbar,
  processing,
  spinner,
}) {
  const getColor = () => {
    switch (color) {
      case 'secondary':
        return colors.warningButton;
      default:
        return colors.main;
    }
  };

  const spinnerElement = spinner || (
    <HollowDotsSpinner color={getColor()} size={24} animationDelay={-100} />
  );

  return (
    <Button
      type="submit"
      color={color}
      disabled={processing}
      onClick={onClick}
      navbar={navbar}
    >
      {processing ? spinnerElement : children}
    </Button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  navbar: PropTypes.bool,
  processing: PropTypes.bool,
  spinner: PropTypes.element,
};

export default SubmitButton;
