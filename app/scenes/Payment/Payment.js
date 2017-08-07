//
// payment scene for credit card stripe payment

import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { TextButton, PrimaryButton, Dropdown } from '../../components';
import { CreditCardInput } from 'react-native-credit-card-input-fullpage';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

import Colors from '../../lib/colors';
import Data from '../../lib/data';
import Fonts from '../../lib/fonts';
import { Actions } from 'react-native-router-flux'
import StripeApi from '../../lib/stripe';
import Creds from '../../lib/creds';

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.user = undefined;

    this.state = {
      cardData: {},
      spinner: true
    };
  }

  componentDidMount() {
    Data.Auth.authChange(user => {
      this.user = user;
      this.setState({
        spinner: false
      });
    });
  }

  componentWillUnmount() {
    if (this.props.locked) {
      Data.Auth.signOut();
    }
  }

  async submitCard() {
    if (this.state.cardData.valid) {

      const { number, expiry, cvc } = this.state.cardData.values;
      const year = expiry.split('/').pop();
      const month = expiry.split('/').shift();

      const { cardId, customerId } = await Data.DB
        .ref(`users/${this.user.uid}`)
        .once('value')
        .then(snapshot => {
          return snapshot.val();
        }).catch(error => {
          console.log(error);
        });

      console.log(cardId);

      if (typeof cardId === 'string') {
        await StripeApi.destroyCard(cardId, customerId);
      }

      const { id } = await StripeApi.createCard(customerId, number, month, year, cvc);

      Data.DB.ref(`users/${this.user.uid}`).update({
        cardId: id,
      }).then(() => {
        this.ccinput.setValues({
          number: '',
          expiry: '',
          cvc: '',
        });
        if (this.props.locked) {
          this.dropdown.showDropdown('success', 'Success', 'Added card to account');
          Actions.DashboardRoute();
        } else {
          this.props.dropdown.showDropdown('success', 'Success', 'Added card to account');
        }
      });

    } else {
      if (this.props.locked) {
        this.dropdown.showDropdown('error', 'Error', 'Card is invalid');
      } else {
        this.props.dropdown.showDropdown('error', 'Error', 'Card is invalid');
      }
    }
  }

  backPress() {
    if (this.props.locked) {
      Data.Auth.signOut();
      Actions.SignInRoute({locked: true});
    } else {
      this.props.backPress();
    }
  }

  render() {
    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Warning: keyboardShouldPersistTaps'];

    var backgroundColor = this.props.backgroundColor || Colors.primaryBackground;

    return (
      <View
        style={[styles.container, {backgroundColor: this.props.backgroundColor}]}
      >
        <View style={{position: 'absolute', top: '18%'}}>
          {/*<Text style={styles.brand}>
            Queue
          </Text>*/}
        </View>
        <KeyboardAvoidingView
          behavior={'position'}
        >
          <View style={{maxWidth: 310}}>
            <CreditCardInput
              ref={ccinput => {this.ccinput = ccinput}}
              inputStyle={{fontFamily: Fonts.content}}
              onChange={form => {this.setState({cardData: form})}}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{position: 'absolute', top: '73%', width: 310}}>
          <PrimaryButton  name={'Submit'} press={this.submitCard.bind(this)} />
        </View>
        <View style={{position: 'absolute', top: '82%'}}>
          <TextButton
            size = {16}
            text = {'Back↵ '}
            press = {this.backPress.bind(this)}
          />
        </View>

        <Spinner
          visible={this.state.spinner}
        />

        <Dropdown
          ref={ref => this.dropdown = ref}
          speed={500}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  brand: {
    fontSize: 75,
    color: Colors.primaryForeground,
    fontFamily: Fonts.brand,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
