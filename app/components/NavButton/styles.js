//
// NavButton Styles

import { StyleSheet } from 'react-native';
import Colors from '../../lib/colors';

const boxWH = 110;

export default styles = StyleSheet.create({
  highlight: {
    marginBottom: -1,
    width: boxWH,
    height: boxWH,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.primaryBackground
  },
  text: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'gray',
    marginTop: (boxWH / 2 - 20)
  }
});
