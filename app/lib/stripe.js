//
// stripe Api

import { stripe } from '../lib/creds';
import Creds from '../lib/creds';
import moment from 'moment';

export default Stripe = {

  // creates a new customer
  createCustomer: user => {
    return fetch('https://api.stripe.com/v1/customers', {
      method: 'POST',
      body: `email=${user.email}`,
      headers: {
        'Authorization': `Bearer ${Creds.stripe.test.secret}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      return response.json();
    });
  },

  // creates card
  createCard: token => {
    return fetch(`https://api.stripe.com/v1/customers/${customerId}/sources`, {
      method: 'POST',
      body: `source=${cardData}`,
      headers: {
        'Authorization': `Bearer ${Creds.stripe.test.secret}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      return response.json();
    });
  },

  // creates token for credit card entry
  createToken: cardData => {
    return fetch(`https://api.stripe.com/v1/tokens`, {
      method: 'POST',
      body: `card[number]=${cardData.values.number}
        &card[exp_month]=${cardData.values.expiry.split('/').pop()}
        &card[exp_year]=${cardData.values.expiry.split('/').shift()}
        &card[cvc]=${cardData.values.cvc}`,
      headers: {
        'Authorization': `Bearer ${Creds.stripe.test.secret}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      return response.json();
    });
  }
};
