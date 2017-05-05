//
// PrimaryButton styles.js

import { StyleSheet } from 'react-native';
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';

export default styles = StyleSheet.create({
  primaryBtn: {
    fontWeight: '500',
    fontFamily: Fonts.content
  },
  btnContainer: {
    padding: 8,
    margin: 15,
    overflow:'hidden',
    borderWidth: 1,
    borderColor: Colors.primaryForeground,
    borderRadius: 4
  }
});
