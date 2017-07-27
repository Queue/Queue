import StripeApi from '../../../app/lib/stripe.js';
import fetch from 'isomorphic-fetch';

test('create subscription', async () => {
  expect.assertions(1);
  const subscription = await StripeApi.createSubscription('cus_B6DmPAxXgrHmBT');
  expect(subscription.quantity).toBe(60);
});
