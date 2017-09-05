//
// QueueList styles

import { StyleSheet } from 'react-native';
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';

export default styles = StyleSheet.create({
  rowFront: {
    width: '100%',
    marginBottom: 1,
    paddingLeft: 20,
    height: 64
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 17,
    fontFamily: Fonts.content,
    paddingTop: 20,
    paddingBottom: 20
  }
});
