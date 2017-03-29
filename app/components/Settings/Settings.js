//
// Settings

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Field from '../Field';

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
        />
        <Field
          type={'text'}
          label={'Organization'}
        />
        <Field
          type={'text'}
          label={'Motto'}
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
  }
});
