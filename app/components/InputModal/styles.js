//
// InputModal Styles

import {StyleSheet} from 'react-native';
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';

export default styles = StyleSheet.create({
  innerWrap: {
    width: 300
  },
  label: {
    marginBottom: 10,
    color: 'white',
    fontFamily: Fonts.content,
    fontSize: 25
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.info,
    height: 60
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
  inputField: {
    fontFamily: Fonts.content,
    fontSize: 30,
    height: 80,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
