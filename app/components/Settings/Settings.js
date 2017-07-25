//
// Settings

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import PrimaryButton from '../PrimaryButton';
import Field from '../Field';
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';
import Common from '../../lib/common';
import DropdownAlert from 'react-native-dropdownalert';
import { Actions } from 'react-native-router-flux';

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Settings
        </Text>
        <Text style={{fontSize: 16, fontFamily: Fonts.content}}>
          Texts sent this month: {this.props.textsSent}
        </Text>
        <View style={{marginTop: 10}}>
          <Field
            type={'text'}
            label={'Email'}
            onChangeText={this.props.onChangeEmail}
            value={this.props.email}
          />
          <Field
            type={'text'}
            label={'Organization'}
            onChangeText={this.props.onChangeOrg}
            value={this.props.organization}
          />
          <View style={{marginTop: 20}}>
            <View style={{width: '100%'}}>
              <PrimaryButton
                name={'Save'}
                buttonColor={Colors.success}
                press={this.props.savePress}
              />
            </View>
            <View style={{width: '100%'}}>
              <PrimaryButton
                name={'Update Payment'}
                buttonColor={Colors.info}
                press={this.props.paymentPress}
              />
            </View>
          </View>
        </View>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          onClose={(data) => this.onClose.bind(this, data)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 13
  },
  header: {
    fontSize: 60,
    fontWeight: '400',
    letterSpacing: 2,
    marginBottom: 3
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    padding: 10,
    fontFamily: Fonts.content,
    letterSpacing: 1
  }
});
