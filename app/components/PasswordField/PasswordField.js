//
// PasswordField Component

import React, { Component } from 'react';
import { TextInput, View, TouchableHighlight, Text } from 'react-native';
import styles from './styles';
import Colors from '../../lib/colors';

export default class PasswordField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true
    };
  }

  showPass() {
    this.setState({
      hide: !this.state.hide
    });
  }

  render() {
    let eyeOfRa = '\uD83D\uDC41',
        change = this.props.change,
        placeholder = this.props.placeholder,
        edit = this.props.edit,
        val = this.props.val,
        textColor = this.props.textColor,
        hide = this.state.hide;

    return (
      <View>
        <TextInput
          style = {styles.passwordField(textColor)}
          onChangeText = {change}
          placeholder = {placeholder}
          editable = {edit}
          value = {val}
          autoCapitalize = {'none'}
          secureTextEntry = {hide}
        />
        <TouchableHighlight
          style = {styles.showTextHighlight()}
          onPress = {this.showPass.bind(this)}
          underlayColor = {'transparent'}>
          <Text style={styles.showText()}>{eyeOfRa}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

PasswordField.propType = {
  placeholder: React.PropTypes.string,
  change: React.PropTypes.func,
  val: React.PropTypes.string,
  textColor: React.PropTypes.string,
  secure: React.PropTypes.bool
}

PasswordField.defaultProps = {
  placeholder: 'Placeholder',
  textColor: Colors.primaryForeground,
  editable: false,
  secure: true
};
