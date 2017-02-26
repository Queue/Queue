//
// QueuerPage is a higher level component
// for displaying editable features of a single queuer

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import Common from '../../lib/common';
import Colors from '../../lib/colors';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class QueuerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameText: this.props.queuer.name,
      partySizeText: this.props.queuer.partySize,
      phoneNumberText: this.props.queuer.phoneNumber,
      notesText: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    Common.logLess(nextProps.queuer);

    this.setState({
      nameText: nextProps.queuer.name,
      partySizeText: nextProps.queuer.partySize,
      phoneNumberText: nextProps.queuer.phoneNumber
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <Text style={styles.header}>
            {this.props.queuer.name}
          </Text>
          <View style={{marginTop: 20}}>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Text>Name</Text>
              <TextInput
                style={{paddingLeft: 15, height: 45, borderColor: Colors.primaryBackground, borderWidth: 1}}
                onChangeText={(text) => {this.setState({nameText: text})}}
                value={this.state.nameText}
              />
            </View>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Text>Party Size</Text>
              <TextInput
                style={{paddingLeft: 15, height: 45, borderColor: Colors.primaryBackground, borderWidth: 1}}
                onChangeText={(text) => {this.setState({partySizeText: text})}}
                value={this.state.partySizeText}
              />
            </View>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Text>Phone Number</Text>
              <TextInput
                style={{paddingLeft: 15, height: 45, borderColor: Colors.primaryBackground, borderWidth: 1}}
                onChangeText={(text) => {this.setState({phoneNumberText: text})}}
                value={this.state.phoneNumberText}
              />
            </View>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Text>Notes</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={{paddingTop: 7, paddingLeft: 15, fontSize: 17, height: 100, borderColor: Colors.primaryBackground, borderWidth: 1}}
                onChangeText={(text) => {this.setState({notesText: text})}}
                value={this.state.notesText}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
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
