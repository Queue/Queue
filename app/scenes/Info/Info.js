// Info component

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
    Browser.open('https://google.com/');
  }

  goToDashboard() {
    if (this.state.seenTerms) {
      Actions.DashboardRoute();
    } else {
      this.dropdown.showDropdown('error', 'Error', 'View the terms and conditions by clicking the link.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.text}>{'Thank you for signing up! You have created an account and started the 7 day trial. Here is some boring terms and conditions to go over prior to using the app. Fun stuff!'}</Text>
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
                  press={this.props.text}
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
    textAlign: 'center',
    width: 400,
    fontSize: 20,
    color: 'grey',
    marginBottom: 20,
  },
});
