//
// payment scene for credit card stripe payment

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../lib/colors';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

export default class Payment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{maxWidth: 400}}>
        <CreditCardInput
          inputStyle={s.input}
          autoFocus
          keyboardShouldPersist={'always'}
          onChange={form => {}}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryBackground
  }
});

const s = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
    maxWidth: 100
  },
});
