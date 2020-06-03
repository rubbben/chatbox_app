import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
    apiKey: "YOUR-API-KEY",
    authDomain: "chatbox-app-ddb94.firebaseapp.com",
    databaseURL: "https://chatbox-app-ddb94.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;