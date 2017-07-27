// Info component

import React, { Component } from 'react';
import { Text, View, StyleSheet, processColor } from 'react-native';
import Colors from '../../lib/colors';
import { Column as Col, Row } from 'react-native-responsive-grid';
import { PrimaryButton, TextButton, Dropdown } from '../../components';
import Browser from 'react-native-browser';
import { Actions } from 'react-native-router-flux'

export default class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seenTerms: false,
    };
  }

  openTerms() {
    this.setState({seenTerms: true});
    Browser.open('https://queue.github.io/terms/', {
      showActionButton: false,
      showDoneButton: true,
      doneButtonTitle: 'Accept',
      buttonTintColor: processColor(Colors.success),
    });
  }

  openAbout() {
    Browser.open('https://queue.github.io', {
      showActionButton: false,
      showDoneButton: true,
      doneButtonTitle: 'Done',
    });
  }

  goToDashboard() {
    if (this.state.seenTerms) {
      Actions.SignUpRoute();
    } else {
      this.dropdown.showDropdown('error', 'Error', 'View the terms and conditions by clicking the link.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.text}>{'Before you sign up I would like you to know what your getting into. Queue allows you to use the app for 7 days prior to starting a subscription. After 7 days you will be promted to start a subscription with us. The bill is $60 + NUMBER OF TEXTS SENT per month. This allows you to save money on slower evenings yet continue to get great service without extra costs for unused texts sent from this app.'}</Text>
          <TextButton
            text={'About the App'}
            size = {16}
            color = {Colors.blue0}
            press={this.openAbout.bind(this)}
          />
          <TextButton
            text={'Terms and Conditions'}
            size = {16}
            press={this.openTerms.bind(this)}
          />
          <Row style={{marginTop: 20}}>
            <Col size={50}>
              <View style={{width: '100%'}}>
                <PrimaryButton
                  name={'Decline'}
                  buttonColor={'grey'}
                  press={Actions.SignInRoute}
                />
              </View>
            </Col>
            <Col size={50}>
              <View style={{width: '100%'}}>
                <PrimaryButton
                  name={'Accept'}
                  buttonColor={Colors.success}
                  press={this.goToDashboard.bind(this)}
                />
              </View>
            </Col>
          </Row>
        </View>
        <Dropdown
          ref={ref => this.dropdown = ref}
          speed={500}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackground,
    width: '100%',
  },
  info: {
    width: 400,
  },
  text: {
    width: 400,
    fontSize: 20,
    color: 'grey',
    marginBottom: 20,
  },
});
