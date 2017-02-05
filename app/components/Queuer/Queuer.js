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

// grid system
import { Grid, Col } from 'react-native-easy-grid';

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
        <View style={styles.wrap}>
          <Text style={[styles.text, {paddingRight: 10}]}>{this.props.place}</Text>
          <Text style={[styles.text, {flexGrow: 2, width: 190}]}>{this.props.name}</Text>
          <Text style={[styles.text, {flexGrow: 1, width: 100}]}>{this.props.waitTime}</Text>
          <Text style={[styles.text, {width: 50}]}>{this.props.partySize}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
