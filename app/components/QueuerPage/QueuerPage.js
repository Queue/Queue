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

  componentDidMount() {
    //Common.logLess(this.props.queuer);
  }

  render() {
    return (
      <View style={styles.container}>
        {Object.keys(this.props.queuer).length ? (
          <View>
            <Text style={styles.header}>
              {this.props.queuer.name}
            </Text>
            <View style={{marginTop: 20}}>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text>Name</Text>
                <TextInput
                  style={{paddingLeft: 10, height: 40, borderColor: Colors.primaryBackground, borderWidth: 1}}
                  onChangeText={(text) => {this.setState({nameText: text})}}
                  placeholder={this.props.queuer.name}
                  value={this.state.nameText}
                />
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text>Party Size</Text>
                <TextInput
                  style={{paddingLeft: 10, height: 40, borderColor: Colors.primaryBackground, borderWidth: 1}}
                  onChangeText={(text) => {this.setState({partySizeText: text})}}
                  placeholder={this.props.queuer.partySize}
                  value={this.state.partySizeText}
                />
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text>Phone Number</Text>
                <TextInput
                  style={{paddingLeft: 10, height: 40, borderColor: Colors.primaryBackground, borderWidth: 1}}
                  onChangeText={(text) => {this.setState({phoneNumberText: text})}}
                  placeholder={this.props.queuer.phoneNumber}
                  value={this.state.phoneNumberText}
                />
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text>Notes</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={{paddingLeft: 10, fontSize: 17, height: 100, borderColor: Colors.primaryBackground, borderWidth: 1}}
                  onChangeText={(text) => {this.setState({notesText: text})}}
                  placeholder={this.props.queuer.notes}
                  value={this.state.notesText}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 250,
            maxWidth: 400}}>
              <Text style={{fontSize: 30, color: Colors.primaryBackground}}>
                Select a person in queue to edit their values.
              </Text>
          </View>
        )}
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
