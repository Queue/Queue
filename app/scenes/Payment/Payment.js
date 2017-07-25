//
// payment scene for credit card stripe payment

import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { TextButton, PrimaryButton } from '../../components';
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input-fullpage';
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

  async submitCardInit() {
    //let { number, expiry, cvc } = this.state.cardData.values;

    let { customerId, cardId, subscriptionId } = await StripeApi.createAndSubscribe(
      Creds.card.number,
      Creds.card.month,
      Creds.card.year,
      Creds.card.cvc,
      this.user.email,
    );

    Data.DB.ref(`users/${this.user.uid}`).update({
      customerId,
      cardId,
      subscriptionId,
    });
  }

  async submitCard() {
    let { cardId, customerId } = await Data
      .DB
      .ref(`users/${this.user.uid}`)
      .once('value')
      .then(snapshot => {
        return snapshot.val();
      }).catch(error => {
        console.log(error);
      });

    let { newCardId } = await StripeApi.updateAndSubscribe(
      Creds.card.number,
      Creds.card.month,
      Creds.card.year,
      Creds.card.cvc,
      cardId,
      customerId,
    );

    Data.DB.ref(`users/${this.user.uid}`).update({
      cardId: newCardId,
    });
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
            press = {this.props.backPress}
          />
        </View>
        <Spinner
          visible={this.state.spinner}
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
    marginTop: -100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
