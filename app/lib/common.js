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

  validatePhoneNumber(phoneNumber) {
    let re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    return re.test(phoneNumber);
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
  },

  serialize(obj, prefix) {
    let str = [], p;
    for(p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          this.serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  },

  async shorten(url) {
    return fetch(`https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAXk9E5mxxUR0JMZyW3HxM8B9wSAMcjhrU`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `{\"longUrl\": \"${url}\"}`,
      })
      .then(res => res.json())
      .catch(error => console.log(error.message));
  },

};
