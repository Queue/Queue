//
// twilio texting api

import queryString from 'query-string';

// use for production creds
import Creds from './creds';

const testCreds = {
  fromNumber: '15005550006',
  accountSid: 'AC6f2da962dc8a0b9f73f9ba1f6718b109',
  authToken: '3ff4945286925ab36a9fbce75270d621',
  encodedAuth: 'Basic QUM2ZjJkYTk2MmRjOGEwYjlmNzNmOWJhMWY2NzE4YjEwOTozZmY0OTQ1Mjg2OTI1YWIzNmE5ZmJjZTc1MjcwZDYyMQ=='
};

// various funtions to interact with twilio api
export default Twilio = {

  // text the customer
  text: (number, message) => {
    const query = queryString.stringify({
      To: number,
      From: Creds.twilio.fromNumber,
      Body: message
    });
    return fetch(`https://api.twilio.com/2010-04-01/Accounts/${Creds.twilio.accountSid}/Messages.json`, {
        headers: {
          'Authorization': Creds.twilio.encodedAuth,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: query
      }).then(response => {
        return response;
      });
  }

}
