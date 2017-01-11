//
// Forgot Scene

import React, { Component } from 'react';
import styles from './styles';
import {View,  Text} from 'react-native';
import {
  PrimaryButton,
  EmailField,
  PasswordField,
  TextButton
} from '../../components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Data from '../../lib/data';
import Colors from '../../lib/colors';
import { Actions } from 'react-native-router-flux'
import Common from '../../lib/common';

export default class Forgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText: ''
    };
  }

  resetPassword() {
    let email = this.state.emailText;

    if (email !== '' && Common.validateEmail(email)) {
      Data.Auth.resetPassEmail(email).then(() => {
        Common.log('Success', 'Password reset email sent.');
        Common.dismissKeyboard();
        Actions.SignInRoute();
      }, (error) => {
        Common.error('Error', 'Email is not registered.');
      });
    } else {
      Common.error('Error', 'Enter your email');
    }
  }

  render() {
    let email = this.state.emailText;

    return (
      <View style = {styles.container}>
        <View style = {styles.wrapper}>
          <Text
            style = {styles.brand}>
            Queue
          </Text>
          <EmailField
            placeholder = {'Email'}
            focus={this.state.focus}
            change = {(text) => this.setState({emailText: text})}
            val = {email}
          />
          <PrimaryButton
            name = {'Reset Password'}
            press = {this.resetPassword.bind(this)}
          />
          <TextButton
            size = {16}
            text = {'Back↵ '}
            press = {Actions.SignInRoute}
          />
          <KeyboardSpacer />
        </View>
      </View>
    );
  }

}
