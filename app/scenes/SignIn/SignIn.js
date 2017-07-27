//
// SignIn Scene

import React, { Component } from 'react';
import styles from './styles';
import {
  View,
  Text
} from 'react-native';
import {
  PrimaryButton,
  EmailField,
  PasswordField,
  TextButton,
  Dropdown
} from '../../components';
import Common from '../../lib/common';
import Data from '../../lib/data';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Actions } from 'react-native-router-flux';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText: '',
      passwordText: ''
    };
  }

  componentDidMount() {
    Data.Auth.authChange((user) => {
      if (user) {
        Actions.DashboardRoute();
      }
    });
  }

  signInUser() {
    let email = this.state.emailText,
        password = this.state.passwordText;

    if (password !== '' && Common.validateEmail(email)) {
      // Reset fields state
      this.setState({
        emailText: '',
        passwordText: ''
      });

     // sign in user
      Data.Auth.signIn(email, password).then(() => {
        Common.dismissKeyboard();
        Actions.DashboardRoute();
      }, (error) => {
      });
    } else {
      this.dropdown.showDropdown('error', 'Error', 'Check your email and password')
    }
  }

  render() {
    let email = this.state.emailText,
        password = this.state.passwordText;

    return (
      <View style = {styles.container}>
        <View style = {styles.wrapper}>
          <Text
            style = {styles.brand}>
            Queue
          </Text>
          <EmailField
            placeholder = {'Email'}
            change = {(text) => this.setState({emailText: text})}
            val = {email}
          />
          <PasswordField
            placeholder = {'Password'}
            secure = {true}
            change = {(text) => this.setState({passwordText: text})}
            val = {password}
          />
          <PrimaryButton
            style={{marginTop: 20}}
            name = {'Sign In'}
            press = {this.signInUser.bind(this)}
          />
          <TextButton
            text = {'Dont have an account?'}
            press = {Actions.InfoRoute}
            size = {16}
          />
          <TextButton
            text = {'Forgot your password?'}
            press = {Actions.ForgotRoute}
            size = {12}
          />
          <KeyboardSpacer />
        </View>
        <Dropdown
          ref={ref => this.dropdown = ref}
        />
      </View>
    );
  }
}
