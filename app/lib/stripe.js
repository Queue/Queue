//
// stripe Api

import { stripe } from '../lib/creds';

export default Stripe = {
  createCustomer: user => {
    return fetch('https://api.stripe.com/v1/customers', {
      method: 'POST',
      body: `email=${user.email}`,
      header: {
        Authorization: 'Bearer sk_test_OH9kC8qEBMyBW5FbITvFEgFo',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      return response.json();
    });
  }
};
