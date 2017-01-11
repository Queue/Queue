//
// EmailField styles.js

import { StyleSheet } from 'react-native'
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';

export default styles = StyleSheet.create({
  emailField: {
    fontFamily: Fonts.content,
    margin: 10,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: 'white'
  }
});
