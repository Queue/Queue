//
// QueueList styles

import { StyleSheet } from 'react-native';
import Colors from '../../lib/colors';

export default styles = StyleSheet.create({
	backTextWhite: {
		color: '#FFF'
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
	}
});
