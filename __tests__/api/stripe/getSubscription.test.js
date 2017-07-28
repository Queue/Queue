import StripeApi from '../../../app/lib/stripe.js';
import fetch from 'isomorphic-fetch';

test('get subscription', async () => {
  expect.assertions(1);
  const subscription = await StripeApi.getSubscription('cus_B6DmPAxXgrHmBT');
  console.log(JSON.stringify(subscription));
  expect(subscription.email).toBe('wafflo8@gmail.com');
});
