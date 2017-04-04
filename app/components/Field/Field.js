//
// Field

import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';

export default class Field extends Component {
  constructor(props) {
    super(props);
  }

  hasLabel() {
    if (this.props.label) {
      return (
        <Text style={styles.label}>{this.props.label}</Text>
      );
    }
  }

  render() {
    // text type
    if (this.props.type === 'text') {
      return (
        <View style={styles.fieldContainer}>
          {this.hasLabel()}
          <TextInput
            style={styles.fieldBase}
            {...this.props}
          />
        </View>
      );
    // text area type
    } else if (this.props.type === 'textarea') {
      return (
        <View style={styles.fieldContainer}>
          {this.hasLabel()}
          <TextInput
            {...this.props}
            multiline={true}
            numberOfLines={4}
            style={styles.textareaInput}
          />
        </View>
      );
    // if no type is specified
    } else {
      return (
        <Text style={{color: Colors.error}}>
          No Input Type
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  label: {
    letterSpacing: 1,
    marginBottom: 5,
    fontFamily: Fonts.content,
    color: 'grey'
  },
  fieldContainer: {
    marginTop: 10,
    marginBottom: 10
  },
  fieldBase: {
    paddingLeft: 15,
    height: 45,
    fontFamily: Fonts.content,
    borderColor: Colors.primaryBackground,
    borderWidth: 1
  },
  textareaInput: {
    paddingTop: 7,
    paddingLeft: 15,
    fontSize: 17,
    fontFamily: Fonts.content,
    height: 140,
    borderColor: Colors.primaryBackground,
    borderWidth: 1
  }
});
