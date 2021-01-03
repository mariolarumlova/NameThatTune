import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
});

const signIn = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log("signed in!");
        resolve(result);
      })
      .catch(function(error) {
        console.log("error " + error);
        reject(error);
      });
  });
};

const signOut = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve("signed out of firebase");
      })
      .catch(err => {
        reject("error in sign out from firebase!", err);
      });
  });
};

const db = app.database();

const usersRef = db.ref("users");

export { signIn, signOut, db, usersRef };
