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

  async createCustomer(email) {
    return await fetch('https://api.stripe.com/v1/customers', {
      method: 'POST',
      headers,
      body: `email=${email}`,
    }).then(customer => {
      console.log('success - new cust');
      return customer.json();
    }).catch(error => {
      console.error(error);
    });
  },

  async getCustomer(customerId) {
    return await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
      method: 'GET',
      headers,
    }).then(customer => {
      console.log(`success - GET customer`);
      return customer.json();
    }).catch(error => {
      console.error(error);
    });
  },

  async destroyCustomer(customerId) {
    return await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
      method: 'DELETE',
      headers,
    }).then(customer => {
      console.log('success - DESTROYED customer');
      return customer.json();
    }).catch(error => {
      console.error(error);
    });
  },

  // generate a unique plan per customer
  async createPlan(customerId) {
    const body = Common.serialize({
      id: `${customerId}_plan`,
      amount: 100, // 1 dollar
      currency: 'usd',
      interval: 'month',
      name: `${customerId} Plan`,
    });
    return await fetch('https://api.stripe.com/v1/plans', {
      method: 'POST',
      headers,
      body,
    }).then(plan => {
      console.log('success - CREATED plan');
      return plan.json();
    }).catch(error => {
      console.error(error);
    });
  },

  async destroyPlan(customerId) {
    return await fetch(`https://api.stripe.com/v1/plans/${customerId}_plan`, {
      method: 'DELETE',
      headers,
    }).then(plan => {
      console.log('success - DESTROYED plan')
      return plan.json();
    }).catch(error => {
      console.error(error);
    });
  },

  async createSubscription(customerId) {
    const body = Common.serialize({
      customer: customerId,
      plan: `${customerId}_plan`,
      quantity: 60,
      trial_period_days: 1,
    });
    return await fetch('https://api.stripe.com/v1/subscriptions', {
      method: 'POST',
      headers,
      body,
    }).then(subscription => {
      console.log('success - new subscription');
      return subscription.json();
    }).catch(error => {
      console.error(error);
    });
  },

  async updateSubscription(subscriptionId, data) {
    const body = Common.serialize(data);
    return await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
      method: 'POST',
      headers,
      body,
    }).then(subscription => {
      console.log('success - UPDATED subscription');
      return subscription.json();
    }).catch(error => {
      console.error(error);
    });
  },

  async getSubscription(subscriptionId) {
    return await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
      method: 'GET',
      headers,
    }).then(subscription => {
      console.log('success - GET subscription');
      return subscription.json();
    }).catch(error => {
      console.error(error);
    });
  },

  async destroySubscription(subscriptionId) {
    return await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
      method: 'DELETE',
      headers,
    }).then(subscription => {
      console.log('success - DESTOYED subscription');
      return subscription.json();
    }).catch(error => {
      console.error(error);
    });
  },

  async createCard(customerId, number, exp_month, exp_year, cvc) {
    const body = Common.serialize({
      source: {
        object: 'card',
        number,
        exp_month,
        exp_year,
        cvc,
      },
    });
    return await fetch(`https://api.stripe.com/v1/customers/${customerId}/sources`, {
      method: 'POST',
      headers,
      body,
    }).then(card => {
      console.log('success - CREATED card');
      return card.json();
    }).catch(error => {
      console.error(error);
    });
  },

  async destroyCard(cardId, custId) {
    return await fetch(`https://api.stripe.com/v1/customers/${custId}/sources/${cardId}`, {
      method: 'DELETE',
      headers,
    }).then((card) => {
      console.log('success - destroyed source')
      return card.json();
    }).catch(error => {
      console.error(error);
    });
  },

};
