import firebase from 'firebase/app'

const config = {
  apiKey: 'AIzaSyBPHRTW99Tdtcbp6mAd3y89XHsfsyOp1NU',
  authDomain: 'vrc-groups.firebaseapp.com',
  databaseURL: 'https://vrc-groups.firebaseio.com',
  projectId: 'vrc-groups',
  storageBucket: 'vrc-groups.appspot.com',
  messagingSenderId: '301509626923',
}

firebase.initializeApp(config)
