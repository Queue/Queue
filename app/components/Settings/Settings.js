//
// Settings

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Field from '../Field';
import Colors from '../../lib/colors';
import Common from '../../lib/common';
import DropdownAlert from 'react-native-dropdownalert';

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
        <TouchableHighlight
          style={{marginTop: 10, backgroundColor: Colors.success}}
          underlayColor={Colors.green4}
          onPress={this.props.savePress}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
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
    fontSize: 70,
    fontWeight: '100',
    letterSpacing: 2,
    marginBottom: 3
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    padding: 15,
    fontFamily: Fonts.content,
    letterSpacing: 1
  }
});
