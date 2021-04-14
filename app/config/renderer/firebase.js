import 'firebase/firestore';
import { initializeApp, auth, firestore } from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAza94pnMcdSmdzkoggpD5FBvNBHo3AOgQ',
  authDomain: 'tvindexer.firebaseapp.com',
  databaseURL: 'https://tvindexer.firebaseio.com',
  projectId: 'tvindexer',
  storageBucket: '',
  messagingSenderId: '20060082019'
};
initializeApp(config);

export const fAuth = auth();
export const fDb = firestore();
