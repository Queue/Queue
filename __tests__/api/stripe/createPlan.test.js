import StripeApi from '../../../app/lib/stripe.js';
import fetch from 'isomorphic-fetch';

test('create plan', async () => {
  expect.assertions(1);
  const plan = await StripeApi.createPlan('cus_B6DmPAxXgrHmBT');
  expect(plan.amount).toBe(100);
});
