import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDLI8ysk_2mibLpjbn3TzCNScwQ2lZdBcw",
    authDomain: "react-tube-69997.firebaseapp.com",
    databaseURL: "https://react-tube-69997.firebaseio.com",
    projectId: "react-tube-69997",
    storageBucket: "react-tube-69997.appspot.com",
    messagingSenderId: "455569990022"
};

firebase.initializeApp(config);
firebase.firestore().settings({
    timestampsInSnapshots: true
});

export default firebase;