//
// NavButton component

import React , { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

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
        <Icon style={styles.text} name={this.props.symbol} size={30} />
      </TouchableHighlight>
    );
  }
}
