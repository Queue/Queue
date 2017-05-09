//
// Layout is a the main global stylesheet that takes in account
// basic and forced upon styles for both ios and android

import { StyleSheet } from 'react-native';
import Colors from './colors';

export default Layout = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    marginTop: 21,
    padding: 15,
    borderTopColor: Colors.primaryBackground,
    borderTopWidth: 1
  }
});
