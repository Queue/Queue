import StripeApi from '../../../app/lib/stripe.js';
import fetch from 'isomorphic-fetch';

test('get customer', async () => {
  expect.assertions(1);
  const customer = await StripeApi.getCustomer('cus_B6DmPAxXgrHmBT');
  console.log(JSON.stringify(customer.subscriptions.data[0].id));
  expect(customer.email).toBe('wafflo8@gmail.com');
});
