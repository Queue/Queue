//
// Queuer list item component

import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';
import Colors from '../../lib/colors';

export default class Queuer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        onPress = {this.props.onPress}
        style = {styles.rowFront}
        underlayColor = {Colors.primaryBackground}>
        <View>
          <Text>{this.props.data}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
