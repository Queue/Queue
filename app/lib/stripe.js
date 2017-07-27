//
// stripe Api

import { stripe } from '../lib/creds';
import Creds from '../lib/creds';
import moment from 'moment';
import Stripe from 'react-native-stripe-api';

const apiKey = Creds.stripe.live.secret;
const client = new Stripe(apiKey);
const headers = {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/x-www-form-urlencoded',
};

export default StripeApi = {

  // create and subscribe credit card @TODO remove this
  async createAndSubscribe(email) {
    let customer = await this.createCustomer(email);
    let subscription = await client.createSubscription(customer.id, 'queue');

    return {
      customerId: customer.id,
      subscriptionId: subscription.id,
    };
  },

  // destroy card -> create token -> update user @TODO remove this
  async updateAndSubscribe(number, month, year, cvc, cardId, custId) {
    let destroy = await this.destroyCard(cardId, custId);
    let token = await client.createToken(number, month, year, cvc);
    let customer = client.addCardToCustomer(token.id, custId);

    return {newCardId: token.card.id};
  },

  async destroyCard(cardId, custId) {
    let destroyedCard = await fetch(`https://api.stripe.com/v1/customers/${custId}/sources/${cardId}`, {
      method: 'DELETE',
      headers,
    }).then((card) => {
      console.log('success - destroyed source')
      return card.json();
    }).catch(error => {
      console.log(error);
    });

    return destroyedCard;
  },

  async createCustomer(email) {
    let customer = await fetch('https://api.stripe.com/v1/customers', {
      method: 'POST',
      headers,
      body: `email=${email}`,
    }).then(customer => {
      console.log('success - new cust');
      return customer.json();
    }).catch(error => {
      console.log(error);
    });

    return customer;
  },

  async getCustomer(customerId) {
    let customer = await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
      method: 'GET',
      headers,
    }).then(customer => {
      console.log('success - new cust');
      return customer.json();
    }).catch(error => {
      console.log(error);
    });

    return customer;
  },

  async createSubscription(customerId) {},

  async addSubscription(subscriptionId) {},

  async updateSubscription(subscriptionId) {},

  async createSource(source) {},

  async addSource(customerId) {},

};
