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

    authChange(func) {
      Firebase.auth().onAuthStateChanged(func);
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
    },

    deleteUser() {
      return Firebase.auth().currentUser.delete();
    },

    reAuth(cred) {
      return Firebase.auth().currentUser.reauthenticateWithCredential(cred);
    },

    authCred(email, password) {
      return firebase.auth.EmailAuthProvider.credential(email, password);
    },

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

    // remove queuer
    removeQueuer(uid, qid) {
      Firebase.database().ref(`queuers/public/${uid}/${qid}`).remove();
      return Firebase.database().ref(`queuers/private/${uid}/${qid}`).remove();
    },

    // Add a queuer
    addQueuer(reference, name, partySize, phoneNumber) {
      const { key } = reference.push({
        name,
        partySize: partySize,
        phoneNumber: phoneNumber,
        notes: '',
        createdAt: Date(),
        removedAt: '',
        seatedAt: '',
        waitTime: 0,
        texted: false,
        seated: false,
        removed: false,
        cancelled: false,
        old: false,
        selected: false,
        opened: false,
      });

      const uid = Firebase.auth().currentUser.uid;

      // create copy for public use only without private data
      Firebase.database().ref(`queuers/public/${uid}`).child(key).set({
        name,
        seated: false,
        removed: false,
        cancelled: false,
        createdAt: Date(),
      });

      return key;
    },

    // Add a queuer
    addQueuerPublic(reference, name, key) {
      reference.child(key).set({
        name,
        seated: false,
        removed: false,
        cancelled: false,
        createdAt: Date(),
      });
    },
  }
};
