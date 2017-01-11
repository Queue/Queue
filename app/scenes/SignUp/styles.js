//
// SignIn styles.js

import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../lib/colors';

let { width, height }  = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: Colors.primaryBackground
  },
  wrapper: {
    width: 300
  },
  brand: {
    fontSize: 142,
    fontFamily: 'airstream',
    marginBottom: -40,
    color: Colors.primaryForeground,
    textAlign: 'center'
  }
});
