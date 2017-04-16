//
// Settings

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Field from '../Field';
import Colors from '../../lib/colors';
import Common from '../../lib/common';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.user = '';

    this.state = {
      emailText: '',
      orgText: ''
    };
  }

  componentDidMount() {
    this.user = this.props.profile;

    this.setState({
      emailText: this.props.profile.email,
      orgText: this.props.profile.displayName
    });
  }

  saveProfile() {
    this.user.updateProfile({
      displayName: this.state.orgText
    }).then(() => {
      console.log('Profile Updated');
    }, (error) => {
      console.log('Profile Update ERROR');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Settings
        </Text>
        <Field
          type={'text'}
          label={'Email'}
          onChangeText={(text) => this.setState({emailText: text})}
          value={this.props.profile.email}
        />
        <Field
          type={'text'}
          label={'Organization'}
          onChangeText={(text) => this.setState({orgText: text})}
          value={this.state.orgText}
        />
        <TouchableHighlight
          style={{marginTop: 10, backgroundColor: Colors.success}}
          underlayColor={Colors.green4}
          onPress={this.saveProfile.bind(this)}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 13
  },
  header: {
    fontSize: 70,
    fontWeight: '100',
    letterSpacing: 2,
    marginBottom: 3
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    padding: 15,
    fontFamily: Fonts.content,
    letterSpacing: 1
  }
});
