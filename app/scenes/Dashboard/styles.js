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
  logOutButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
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
