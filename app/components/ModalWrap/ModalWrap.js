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
  }
});
