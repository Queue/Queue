//
// Btn component file

import React from 'react'
import styles from './styles';

// Custom simple button with wrapper
import Button from 'react-native-button';
import Colors from '../../lib/colors';

export default PrimaryBtn = ({name, press, buttonColor, fontSize}) => {

  styles.buttonOverwrite = {
    color: buttonColor,
    fontSize: fontSize
  }

  styles.containerOverwrite = {
    borderColor: buttonColor
  }

  return (
    <Button
      onPress = {press}
      style = {[styles.primaryBtn, styles.buttonOverwrite]}
      containerStyle = {[styles.btnContainer, styles.containerOverwrite]}>
      {name}
    </Button>
  );
};

PrimaryBtn.propType = {
  name: React.PropTypes.string,
  press: React.PropTypes.func,
  buttonColor: React.PropTypes.string,
  fontSize: React.PropTypes.number
}

PrimaryBtn.defaultProps = {
  buttonColor: Colors.primaryForeground,
  fontSize: 20
};
