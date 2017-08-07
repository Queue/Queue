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
import StripeApi from '../../lib/stripe';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Actions } from 'react-native-router-flux';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText: '',
      passwordText: '',
      locked: false,
    };
  }

  componentDidMount() {
    Data.Auth.authChange((user) => {
      if (user) {
        Data.DB.ref(`users/${user.uid}`).once('value').then(snap => {
          const status = snap.val().status
          const hasSource = snap.val().hasSource;
          if (status === 'trialing' || (status === 'active' && hasSource)) {
            Actions.DashboardRoute();
          } else {
            Actions.PaymentRoute({locked: true});
          }
        });
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
      Data.Auth.signIn(email, password).then(async user => {
        const customerId = await Data.DB.ref(`users/${user.uid}`).once('value').then(snap => {
          return snap.val().customerId;
        }).catch(error => {
          console.log(error);
          this.dropdown.showDropdown('error', 'Error', error.message);
        });
        const customer = await StripeApi.getCustomer(customerId);
        const status = customer.subscriptions.data[0].status;
        const hasSource = customer.sources.total_count;
        if (status === 'trialing' || (status === 'active' && hasSource)) {
          Common.dismissKeyboard();
          Actions.DashboardRoute();
        } else {
          Common.dismissKeyboard();
          Data.DB.ref(`users/${user.uid}`).update({status, hasSource}).then(() => {
            console.log('updated');
            Actions.PaymentRoute({locked: true});
          }).catch(error => {
            console.log(error.message);
          });
        }
      }).catch(error => {
        this.dropdown.showDropdown('error', 'Error', error.message);
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
