import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Header from './shared/Header';
import HomePage from './home/HomePageContainer';
import ProfilePage from './account/ProfilePage'
import LoginPage from './account/LoginPageContainer'

export default function Template(props) {
  return (
    <Router>
      <div className="wrapper">
        <p>{props.progress}</p>
        <Header username="anonymous"/>
        <section className="page-content container-fluid">
          <Route exact path="/account/login" component={LoginPage} />
          <Route exact path="/" component={HomePage} />
          <Route path="/account/profile/:id" component={ProfilePage} />
        </section>
      </div>
    </Router>
  );
}