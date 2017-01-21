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

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.8)'
  },
  innerWrap: {
    width: 300
  },
  label: {
    marginBottom: 10,
    color: 'white',
    fontFamily: Fonts.content,
    fontSize: 35
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue0,
    height: 50
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
  inputField: {
    fontFamily: Fonts.content,
    fontSize: 30,
    height: 80,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
