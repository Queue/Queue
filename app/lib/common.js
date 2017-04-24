//
// Common functions exist here

import { Alert } from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import Reactotron from 'reactotron-react-native'

export default Common = {

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  dismissKeyboard() {
    dismissKeyboard();
  },

  warn(title, message, cancel, ok) {
    //Reactotron.log(`Warning\nCode: ${title}\nMessage: ${message}`);
    Alert.alert(
      title,
      message,
      [
        {text: 'Cancel', onPress: cancel, style: 'cancel'},
        {text: 'OK', onPress: ok}
      ]
    );
  },

  error(code, message) {
    Reactotron.log(`Error\nCode: ${code}\nMessage: ${message}`);
    Alert.alert(
      code,
      message,
      [{text: 'OK', style: 'cancel'}]
    );
  },

  log(code, message) {
    Reactotron.log(`Log\nCode: ${code}\nMessage: ${message}`);
  },

  logLess(message) {
    Reactotron.log(message);
  }

};
