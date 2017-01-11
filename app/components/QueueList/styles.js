//
// QueueList styles

import { StyleSheet } from 'react-native';
import Colors from '../../lib/colors';

export default styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.primaryBackground,
		flex: 1,
    zIndex: 9999,
    marginTop: 21,
    borderTopColor: Colors.primaryBackground,
    borderTopWidth: 1
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		backgroundColor: 'white',
		alignItems: 'flex-start',
    paddingLeft: 20,
    marginBottom: 1,
    paddingRight: 20,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: Colors.primaryBackground,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
    marginBottom: 1,
    marginTop: -1,
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: Colors.info,
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: Colors.error,
		right: 0
	},
  moreButton: {
    backgroundColor: Colors.text,
    right: 150
  },
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: 100,
	}
});
