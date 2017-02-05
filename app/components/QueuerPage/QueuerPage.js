//
// QueuerPage is a higher level component
// for displaying editable features of a single queuer

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Common from '../../lib/common';

export default class QueuerPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Common.logLess(this.props.queuer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.props.queuer.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 13
  },
  header: {
    fontSize: 55,
    fontWeight: '100',
    letterSpacing: 2
  }
});
