//
// SignUp Scene

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
import StripeApi from '../../lib/stripe';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText: '', // fields text state
      passwordText: '', // password field
      emailColor: Colors.primaryForeground, // color states
      passwordColor: Colors.primaryForeground
    };
  }

  createUser() {
    let email = this.state.emailText,
        password = this.state.passwordText;

    if (Common.validateEmail(email)) {
      if (password !== '' || password.length >= 8) {
        Data.Auth.signUp(email, password).then(user => { // sign up the user
          StripeApi.createAndSubscribe(user.email).then(customer => {
            console.log(customer.customerId);
          });
          Data.DB.ref(`users/${user.uid}`).set({
            texts: 0
          }).then(() => {
            Common.log('Success', 'User signed up.');
            Actions.DashboardRoute();
            Common.dismissKeyboard();
          });
        }, (error) => {
          Common.error(error.code, error.message);
        });

        // reset text
        this.setState({
          emailText: '',
          passwordText: ''
        });
      } else {
        Common.error('Error', 'Enter a valid password.\n(Eight characters or more)');
      }
    } else {
      Common.error('Error', 'Enter a valid email.');
    }
  }

  checkEmail(text) {
    if (Common.validateEmail(text)) {
      this.setState({emailColor: Colors.primaryForeground});
    } else {
      this.setState({emailColor: Colors.warning});
    }

    this.setState({emailText: text});
  }

  checkPass(text) {
    if (text.length >= 8) {
      this.setState({passwordColor: Colors.primaryForeground});
    } else {
      this.setState({passwordColor: Colors.warning});
    }

    this.setState({passwordText: text});
  }

  render() {
    let email = this.state.emailText,
        password = this.state.passwordText,
        emailColor = this.state.emailColor,
        passColor = this.state.passwordColor;

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.brand}>
            Queue
          </Text>
          <EmailField
            textColor = {emailColor}
            placeholder = {'Email'}
            change = {this.checkEmail.bind(this)}
            val = {email} />
          <PasswordField
            textColor = {passColor}
            placeholder = {'Password'}
            change = {this.checkPass.bind(this)}
            val = {password} />
          <PrimaryButton
            name = {'Sign Up'}
            press = {this.createUser.bind(this)} />
          <TextButton
            text={'Already have an account?'}
            size = {16}
            press={Actions.SignInRoute} />
          <KeyboardSpacer />
        </View>
      </View>
    );
  }

}
