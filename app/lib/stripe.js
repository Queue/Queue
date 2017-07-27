//
// stripe Api

import { stripe } from '../lib/creds';
import Creds from '../lib/creds';
import moment from 'moment';
import Stripe from 'react-native-stripe-api';
import Common from '../lib/common';

const apiKey = Creds.stripe.live.secret;
const client = new Stripe(apiKey);
const headers = {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/x-www-form-urlencoded',
};

export default StripeApi = {

  // create and subscribe credit card @TODO remove this
  async createAndSubscribe(email) {
    const customer = await this.createCustomer(email);
    const subscription = await client.createSubscription(customer.id, 'queue');

    return {
      customerId: customer.id,
      subscriptionId: subscription.id,
    };
  },

  // destroy card -> create token -> update user @TODO remove this
  async updateAndSubscribe(number, month, year, cvc, cardId, custId) {
    const destroy = await this.destroyCard(cardId, custId);
    const token = await client.createToken(number, month, year, cvc);
    const customer = client.addCardToCustomer(token.id, custId);

    return {newCardId: token.card.id};
  },

  async destroyCard(cardId, custId) {
    const destroyedCard = await fetch(`https://api.stripe.com/v1/customers/${custId}/sources/${cardId}`, {
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
    const customer = await fetch('https://api.stripe.com/v1/customers', {
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
    const customer = await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
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

  async createPlan(customerId) {
    const body = Common.serialize({
      id: `${customerId}_plan`,
      amount: 100,
      currency: 'usd',
      interval: 'month',
      name: `${customerId} Plan`,
    });
    const plan = await fetch('https://api.stripe.com/v1/plans', {
      method: 'POST',
      headers,
      body,
    }).then(plan => {
      console.log('success - plan created');
      return plan.json();
    }).catch(error => {
      console.log(error);
    });

    return plan;
  },

  async createSubscription(customerId) {
    const body = Common.serialize({
      customer: customerId,
      plan: `${customerId}_plan`,
      quantity: 60,
      trial_period_days: 7,
    });
    const subscription = await fetch('https://api.stripe.com/v1/subscriptions', {
      method: 'POST',
      headers,
      body,
    }).then(subscription => {
      console.log('success - new subscription');
      return subscription.json();
    }).catch(error => {
      console.log(error);
    });

    return subscription;
  },

  async addSubscription(subscriptionId) {},

  async updateSubscription(subscriptionId) {},

  async createSource(source) {},

  async addSource(customerId) {},

};
