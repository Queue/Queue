//
// TextButton component

import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import styles from './styles';
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';

export default TextButton = ({color, font, press, text, size, disable}) => {

  // Set font size defaults to 14
  styles.size = {
    fontSize: size,
    fontFamily: font,
    color: color
  }

  return (
    <TouchableHighlight
      onPress = {press}
      underlayColor = {'transparent'}
    >
      <Text style = {[styles.textButton, styles.size]}>{text}</Text>
    </TouchableHighlight>
  );
};

TextButton.propTypes = {
  press: React.PropTypes.func,
  text: React.PropTypes.string,
  size: React.PropTypes.number,
  font: React.PropTypes.string
};

TextButton.defaultProps = {
  text: 'Add Text',
  size: 14,
  font: Fonts.content,
  color: Colors.primaryForeground,
}
