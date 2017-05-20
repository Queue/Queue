//
// Field

import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

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
            {/*<Sae
              label={this.props.label}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'#333'}
              autoCapitalize={'words'}
              autoCorrect={false}
              inputStyle={{color: '#333'}}
              {...this.props}
            />*/}
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
    marginBottom: 2,
    fontFamily: Fonts.content,
    color: 'grey'
  },
  fieldContainer: {
    marginTop: 8,
    marginBottom: 8,
    borderColor: Colors.primaryBackground,
    borderBottomWidth: 1,
    width: '100%'
  },
  fieldBase: {
    paddingLeft: 15,
    height: 40,
    fontFamily: Fonts.content,
  },
  textareaInput: {
    paddingTop: 7,
    paddingLeft: 15,
    fontSize: 17,
    fontFamily: Fonts.content,
    height: 170,
    borderColor: Colors.primaryBackground,
    borderLeftWidth: 1
  }
});
