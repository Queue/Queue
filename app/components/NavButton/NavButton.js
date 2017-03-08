//
// NavButton component

import React , { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import styles from './styles';

export default class NavButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor={Colors.primaryBackground}
        style={styles.highlight}>
        <Text style={styles.text}>{this.props.symbol}</Text>
      </TouchableHighlight>
    );
  }
}
