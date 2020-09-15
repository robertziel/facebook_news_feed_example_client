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
        <NavLink exact to="/profile">
          <Button navbar>
            <FontAwesome name="user" />
          </Button>
        </NavLink>
      </div>
      <div className="navbar-right">
        <NavLink exact to="/">
          <Button navbar>
            <FontAwesome name="home" />
          </Button>
        </NavLink>
      </div>
    </Wrapper>
  );
}

export default Navbar;
