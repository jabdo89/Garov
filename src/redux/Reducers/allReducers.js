import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import dashReducer from './dashReducer';
import authReducer from './authReducer';

const allReducers = combineReducers({
  auth: authReducer,
  dash: dashReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default allReducers;
