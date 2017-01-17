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

          <View style={styles.innerWrap}>
            <TextInput
              style={styles.inputField}
              onChangeText={this.props.onChangeText}
              placeholder={'Name'} />
            <PrimaryBtn
              name={this.props.btnName}
              press={this.props.modalPress} />
          </View>

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
  inputField: {
    fontFamily: Fonts.content,
    fontSize: 30,
    marginBottom: 15,
    height: 80,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: 'white'
  }
});
