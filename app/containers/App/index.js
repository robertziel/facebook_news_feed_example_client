/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import { Container, Scroll } from 'components/_ui-elements';

import Navbar from 'components/Navbar/index';
import Footer from 'components/Footer/index';

import HomePage from 'containers/_pages/HomePage/Loadable';
import NewPostPage from 'containers/_pages/NewPostPage/Loadable';
import PostPage from 'containers/_pages/PostPage/Loadable';
import ProfilePage from 'containers/_pages/ProfilePage/Loadable';

import ContentWrapper from './ContentWrapper';

function App() {
  return (
    <ContentWrapper>
      <Navbar />
      <Scroll id="main-scroll">
        <Container id="main-container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/new-post" component={NewPostPage} />
            <Route exact path="/post/:id" component={PostPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Container>
      </Scroll>
      <Footer />
    </ContentWrapper>
  );
}

export default App;
