import StripeApi from '../../../app/lib/stripe.js';
import fetch from 'isomorphic-fetch';

test('destroy card', async () => {
  expect.assertions(1);
  const card = await StripeApi.destroyCard('card_1Akc3RBXSKjmZlrdH3Ogc5pU', 'cus_B6DmPAxXgrHmBT');
  console.log(JSON.stringify(card));
  expect(card.deleted).toBe(true);
});
