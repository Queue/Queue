//
// stripe Api

import { stripe } from '../lib/creds';
import Creds from '../lib/creds';
import moment from 'moment';
import Stripe from 'react-native-stripe-api';

const apiKey = Creds.stripe.live.secret;
const client = new Stripe(apiKey);

export default StripeApi = {

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
  },

  // create and subscribe credit card
  async createAndSubscribe(email) {
    let customer = await this.createCustomer(email);
    console.log('customer');
    let subscription = await client.createSubscription(customer.id, 'queue');

    return {
      customerId: customer.id,
      subscriptionId: subscription.id,
    };
  },

  // destroy card -> create token -> update user
  async updateAndSubscribe(number, month, year, cvc, cardId, custId) {
    console.log(custId);
    let destroy = await this.destroyCard(cardId, custId);
    let token = await client.createToken(number, month, year, cvc);
    let customer = client.addCardToCustomer(token.id, custId);

    return {newCardId: token.card.id};
  },

  async destroyCard(cardId, custId) {
    let destroyedCard = await fetch(`https://api.stripe.com/v1/customers/${custId}/sources/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Creds.stripe.live.secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((card) => {
      return card;
      console.log('success - destroy')
    }).catch(error => {
      console.log(error);
    });

    return destroyedCard;
  },

  async createCustomer(email) {
    let customer = await fetch('https://api.stripe.com/v1/customers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Creds.stripe.live.secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}`,
    }).then((customer) => {
      console.log('success - new cust');
      return customer;
    }).catch(error => {
      console.log(error);
    });

    return customer;
  },

  async getCustomer(customerId) {
    let customer = await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Creds.stripe.live.secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(customer => {
      console.log('success - new cust');
      return customer;
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
