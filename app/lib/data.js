//
// Data abstraction - using Firebase but
// should be able to swap out other database, authentication and filesystem logic,
// functions and models in one place.

import * as firebase from 'firebase';
import Creds from './creds';
import Common from './common';

const Firebase = firebase.initializeApp(Creds.firebase);

export default Data = {

  // Authentication methods
  Auth: {

    // get user
    user() {
      return Firebase.auth().currentUser;
    },

    // Sign in method
    signIn(email, password) {
      return Firebase.auth().signInWithEmailAndPassword(email, password);
    },

    // Sign up method
    signUp(email, password) {
      return Firebase.auth().createUserWithEmailAndPassword(email, password);
    },

    // Sign out method
    signOut() {
      return Firebase.auth().signOut();
    },

    // Reset pass email method
    resetPassEmail(email) {
      return Firebase.auth().sendPasswordResetEmail(emailAddress);
    }

  },

  // Database wrapper
  DB: {

    // DB reference method
    ref(reference) {
      return Firebase.database().ref(reference);
    },

    // Delete data from DB
    delete(reference) {
      return Firebase.database().ref(reference).remove();
    },

    add(reference, name, partySize, phoneNumber) {
      let user = Firebase.auth().currentUser;
      console.log(user.uid)

      reference.push({
        name: name,
        partySize: partySize,
        phoneNumber: phoneNumber,
        notes: '',
        createdAt: Date()
      });
    }

  }
};
