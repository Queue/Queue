//
// InputModal

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';
import Common from '../../lib/common';

export default class ModalExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {Common.log('Modal has been closed.')}}>

          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello Modal!</Text>
              <TouchableHighlight
                onPress={this.props.close}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}
