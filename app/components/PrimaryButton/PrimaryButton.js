//
// Btn component file

import React from 'react'
import styles from './styles';

// Custom simple button with wrapper
import Button from 'react-native-button';
import Colors from '../../lib/colors';

export default PrimaryBtn = ({disable, name, press, buttonColor, fontSize, style=[] }) => {

  styles.buttonOverwrite = {
    color: buttonColor,
    fontSize: fontSize
  }

  styles.containerOverwrite = {
    borderColor: buttonColor
  }

  return (
    <Button
      onPress={press}
      style={[styles.primaryBtn, styles.buttonOverwrite, ...style]}
      containerStyle={[styles.btnContainer, styles.containerOverwrite]}
      disabled={disable}
    >
      {name}
    </Button>
  );
};

PrimaryBtn.propType = {
  name: React.PropTypes.string,
  press: React.PropTypes.func,
  buttonColor: React.PropTypes.string,
  fontSize: React.PropTypes.number,
  disable: React.PropTypes.boolean,
}

PrimaryBtn.defaultProps = {
  buttonColor: Colors.primaryForeground,
  fontSize: 20,
  disable: false,
};
