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
//import Stripe from '../../lib/stripe';
import Fonts from '../../lib/fonts';
import { Actions } from 'react-native-router-flux'
import Stripe from 'react-native-stripe-api';
import Creds from '../../lib/creds';

const apiKey = Creds.stripe.live.secret;
const client = new Stripe(apiKey);

export default class Payment extends Component {
  constructor(props) {
    super(props);
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

  submitCardData() {
    let { number, expiry, cvc } = this.state.cardData.values;
    client.createToken(number,
      expiry.split('/').shift(),
      expiry.split('/').pop(),
      cvc).then(token => {

      console.log(token);
      client.createCustomer(token.id, this.user.email).then(resp => {
        console.log(resp);
        Data.DB.ref(this.user.id).update({
          customerId: resp.id
        });
      });

    }).catch(error => {

      console.error(error);

    });
    /*Stripe.createCustomer(this.user).then(resp => {
      console.log(resp.id);
    }).catch(error => {
      console.log(error);
    });*/
  }

  render() {
    //console.disableYellowBox = true;
    console.ignoredYellowBox = ['Warning: "keyboardShouldPersistTaps"'];

    return (
      <View
        style={styles.container}
      >
        <View style={{position: 'absolute', top: '18%'}}>
          <Text style={styles.brand}>
            Queue
          </Text>
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
          <PrimaryButton  name={'Submit'} press={this.submitCardData.bind(this)} />
        </View>
        <View style={{position: 'absolute', top: '82%'}}>
          <TextButton
            size = {16}
            text = {'Back↵ '}
            press = {this.props.comingFrom ? Actions.DashboardRoute : Actions.SignInRoute}
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
    fontFamily: Fonts.brand
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryBackground
  }
});
