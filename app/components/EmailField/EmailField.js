//
// Email Field Component

import React from 'react'
import { View, TextInput } from 'react-native';
import styles from './styles';
import Colors from '../../lib/colors';

export default EmailField = ({placeholder, change, val, focus, textColor}) => {

  // use the same styles object to add prop
  // changes so it can be controlled by state
  // in other components
  styles.props = {
    color: textColor
  };

  return (
    <TextInput
      style={ [styles.emailField,  styles.props] }
      autoFocus={focus}
      autoCapitalize={'none'}
      onChangeText={change}
      keyboardType={'email-address'}
      placeholder={placeholder}
      value={val}
    />
  );
}

EmailField.propTypes = {
  placeholder: React.PropTypes.string,
  val: React.PropTypes.string,
  change: React.PropTypes.func,
  textColor: React.PropTypes.string
};

EmailField.defaultProps = {
  placeholder: 'placeholder',
  textColor: Colors.primaryForeground
};
