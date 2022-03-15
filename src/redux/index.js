import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { Provider, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  ReactReduxFirebaseProvider,
  getFirestore,
  getFirebase,
  isLoaded
} from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import allReducers from './Reducers/allReducers';
import { firebaseConfig, rrfConfig } from './config';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div></div>;
  return children;
}

const middlewares = [thunk.withExtraArgument(getFirebase, getFirestore)];

const store = createStore(allReducers, compose(applyMiddleware(...middlewares)));

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.database();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const ReduxWrapper = ({ children }) => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>{children}</AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>
);

ReduxWrapper.propTypes = {
  children: PropTypes.any.isRequired
};

export default ReduxWrapper;
