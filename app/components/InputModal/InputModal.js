//
// InputModal

import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import styles from './styles';
import Common from '../../lib/common';
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';

export default class ModalExample extends Component {
  constructor(props) {
    super(props);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <View
        style={styles.innerWrap}
        ref={component => this._root = component}>
        <Text style={styles.label}>{this.props.label}</Text>
        <TextInput
          autoCapitalize={'words'}
          autoFocus={true}
          style={styles.inputField}
          onChangeText={this.props.onChangeText}
          value={this.props.value} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.props.onPress}>
          <Text style={styles.buttonText}>
            {this.props.buttonText}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
