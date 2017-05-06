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

  // if has label return label else return nada
  hasLabel() {
    if (this.props.label) {
      return (
        <Text style={styles.label}>{this.props.label}</Text>
      );
    }
  }

  render() {
    switch (this.props.type) {

      case 'text':
        return (
          <View style={styles.fieldContainer}>
            {this.hasLabel()}
            <TextInput
              style={styles.fieldBase}
              {...this.props}
            />
          </View>
        );
        break;

      case 'textarea':
        return (
          <View style={styles.fieldContainer}>
            {this.hasLabel()}
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={[styles.textareaInput, this.props.style]}
              {...this.props}
            />
          </View>
        );
        break;

      case 'number':
        return (
          <View style={styles.fieldContainer}>
            {this.hasLabel()}
            <TextInput
              style={[styles.fieldBase, this.props.style]}
              keyboardType={'phone-pad'}
              value={this.props.value}
              {...this.props}
            />
          </View>
        );
        break;

      default:
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
    marginTop: 8,
    marginBottom: 8
  },
  fieldBase: {
    paddingLeft: 15,
    height: 45,
    fontFamily: Fonts.content,
    borderRadius: 2,
    borderColor: Colors.primaryBackground,
    borderWidth: 1
  },
  textareaInput: {
    paddingTop: 7,
    paddingLeft: 15,
    fontSize: 17,
    fontFamily: Fonts.content,
    height: 140,
    borderRadius: 2,
    borderColor: Colors.primaryBackground,
    borderWidth: 1
  }
});
