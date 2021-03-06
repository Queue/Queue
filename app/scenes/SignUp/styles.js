//
// SignIn styles.js

import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';

let { width, height }  = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height,
    backgroundColor: Colors.primaryBackground
  },
  wrapper: {
    width: 300
  },
  brand: {
    fontSize: 80,
    fontFamily: Fonts.brand,
    color: Colors.primaryForeground,
    textAlign: 'center'
  }
});
