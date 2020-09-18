import React from 'react';

import { NavLink } from 'react-router-dom';
import { Button } from 'components/_ui-elements';
import FontAwesome from 'react-fontawesome';
import LanguageToggle from 'components/LanguageToggle/index';
import SignOutButton from 'components/SignOutButton/index';

import Wrapper from './Wrapper';

function Navbar() {
  return (
    <Wrapper>
      <div className="navbar-right">
        <SignOutButton />
      </div>
      <div className="navbar-right">
        <LanguageToggle />
      </div>
      <div className="navbar-right">
        <Button navbar component={NavLink} exact to="/profile">
          <FontAwesome name="user" />
        </Button>
      </div>
      <div className="navbar-right">
        <Button navbar component={NavLink} exact to="/">
          <FontAwesome name="home" />
        </Button>
      </div>

      <div className="navbar-left">
        <Button navbar component={NavLink} exact to="/new-post">
          <FontAwesome name="plus" />
        </Button>
      </div>
    </Wrapper>
  );
}

export default Navbar;
