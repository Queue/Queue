//
// Queuer Item

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles from './styles';

export default class HiddenRow extends Component {
  render() {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={this.props.deletePress}>
          <Text style={styles.backTextWhite}>{'Delete'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={this.props.textPress}>
          <Text style={styles.backTextWhite}>{'Text'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
