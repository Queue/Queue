//
// QueuerPage Styles

import { StyleSheet } from 'react-native';
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';

export default styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 13,
  },
  header: {
    fontSize: 55,
    fontWeight: '100',
    fontFamily: Fonts.content,
    letterSpacing: 2
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    padding: 10,
    fontFamily: Fonts.content,
    letterSpacing: 1
  },
  col: {
    margin: 5
  },
  label: {
    letterSpacing: 1,
    marginBottom: 5,
    fontFamily: Fonts.content,
    color: 'grey'
  },
  unselectedContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
    width: '100%'
  },
  unselectedText: {
    fontSize: 30,
    color: Colors.primaryBackground
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    paddingLeft: 15,
    height: 45,
    borderColor: Colors.primaryBackground,
    borderWidth: 1
  },
  textareaInput: {
    paddingTop: 7,
    paddingLeft: 15,
    fontSize: 17,
    height: 140,
    borderColor: Colors.primaryBackground,
    borderWidth: 1
  }
});
