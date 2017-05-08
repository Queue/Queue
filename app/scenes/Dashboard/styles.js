//
// Dashboard styles

import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  listContainer: {
		backgroundColor: Colors.primaryBackground,
		flex: 1,
    zIndex: 9999,
    marginTop: 21,
    borderTopColor: Colors.primaryBackground,
    borderTopWidth: 1
	},
  default: {
    backgroundColor: 'white'
  },
  brand: {
    position: 'absolute',
    justifyContent: 'center',
    lineHeight: 50,
    fontWeight: '900'
  },
  navMenu: {
    borderRightWidth: 1,
    borderColor: Colors.primaryBackground,
    maxWidth: 110
  },
  actionArea: {
    borderRightWidth: 1,
    borderColor: Colors.primaryBackground,
    minWidth: 525
  },
  queueList: {
    backgroundColor: 'transparent'
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: Colors.primaryForeground,
    maxHeight: 60
  },
  addButtonText: {
    color: 'white',
    fontSize: 55,
    marginTop: -5
  }
});
