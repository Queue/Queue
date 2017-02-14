//
// QueuerPage is a higher level component
// for displaying editable features of a single queuer

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Common from '../../lib/common';
import Colors from '../../lib/colors';

export default class QueuerPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Common.logLess(this.props.queuer);
  }

  showHelpText() {
    let data = this.props.queuer;
    if (!Object.keys(data).length) {
      Common.logLess('show nothing');
      return(
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250,
        maxWidth: 300}}>
          <Text style={{fontSize: 30, color: Colors.primaryBackground}}>
            Add a person to the list or select them to edit their values.
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.props.queuer.name}
        </Text>
        {this.showHelpText()}
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
