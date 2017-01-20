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
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {Common.log('Modal has been closed.')}}>

        <TouchableHighlight
          style={styles.wrap}
          onPress={this.props.close}
          underlayColor={'transparent'}>

          {this.props.children}

        </TouchableHighlight>

      </Modal>
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