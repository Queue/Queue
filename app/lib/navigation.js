//
// Router Navigation

import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {
  SignIn,
  SignUp,
  Forgot,
  Dashboard,
  Payment,
  Info
} from '../scenes';
import Data from './data'

export default class Navigation extends Component {
   render() {
    return (
      <Router duration={0}>
        <Scene key={'Root'} duration={0} animation={'fade'}>
          <Scene
            initial = {true}
            key = {'SignInRoute'}
            component = {SignIn}
            hideNavBar = {true}
          />
          <Scene
            key = {'SignUpRoute'}
            component = {SignUp}
            hideNavBar = {true}
          />
          <Scene
            key = {'ForgotRoute'}
            component = {Forgot}
            hideNavBar = {true}
          />
          <Scene
            key = {'DashboardRoute'}
            component = {Dashboard}
            hideNavBar = {true}
            panHandlers={null}
          />
          <Scene
            key = {'PaymentRoute'}
            component = {Payment}
            hideNavBar = {true}
          />
          <Scene
            key = {'InfoRoute'}
            component = {Info}
            hideNavBar = {true}
          />
        </Scene>
      </Router>
    );
  }
};
