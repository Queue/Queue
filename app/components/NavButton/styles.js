//
// NavButton Styles

import { StyleSheet } from 'react-native';
import Colors from '../../lib/colors';

const boxWH = 110;

export default styles = StyleSheet.create({
  highlight: {
    height: 110,
    width: '100%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.primaryBackground
  },
  text: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 30,
    color: 'gray',
    marginTop: (boxWH / 2 - 20)
  }
});
