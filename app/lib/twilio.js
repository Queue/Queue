//
// twilio texting api

import queryString from 'query-string';

// use for production creds
import Creds from './creds';

// various funtions to interact with twilio api
export default {
  // text the customer
  text: (number, message) => {
    const query = queryString.stringify({
      To: number,
      From: Creds.twilio.fromNumber,
      Body: message,
    });
    return fetch(`https://api.twilio.com/2010-04-01/Accounts/${Creds.twilio.accountSid}/Messages.json`, {
      headers: {
        Authorization: Creds.twilio.encodedAuth,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: query,
    }).then(response => response);
  },
};
