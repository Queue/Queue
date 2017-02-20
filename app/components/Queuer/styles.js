//
// QueueList styles

import { StyleSheet } from 'react-native';
import Colors from '../../lib/colors';

export default styles = StyleSheet.create({
  rowFront: {
    backgroundColor: 'white',
    marginBottom: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 17,
    paddingTop: 20,
    paddingBottom: 20
  }
});
