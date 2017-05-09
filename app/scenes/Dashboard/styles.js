//
// Dashboard styles

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  listContainer: {
    height: '100%',
    width: '100%',
		backgroundColor: Colors.primaryBackground,
    zIndex: 99,
    marginTop: 21,
    borderTopColor: Colors.primaryBackground,
    borderTopWidth: 1
	},
  default: {
    backgroundColor: 'white'
  },
  brand: {
    justifyContent: 'center',
    lineHeight: 50,
    fontWeight: '900'
  },
  navMenu: {
    paddingRight: 0,
    paddingLeft: 0,
    justifyContent: 'center',
    width: '100%',
    borderRightWidth: 1,
    borderColor: Colors.primaryBackground
  },
  actionArea: {
    width: '100%',
    borderRightWidth: 1,
    borderColor: Colors.primaryBackground
  },
  queueList: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  addButton: {
    width: '100%',
    backgroundColor: Colors.primaryForeground,
    zIndex: 999,
    marginTop: -81,
    height: 60
  },
  addButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 55,
    lineHeight: 55,
    marginTop: 4
  }
});
