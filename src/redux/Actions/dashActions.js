const moment = require('moment');

export const createService = info => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const startTime = moment(info.startTime).valueOf();
    const startDate = moment(info.startDate).valueOf();

    db.collection('Services')
      .add({
        declaredValue: info.declaredValue,
        hub: info.hub,
        startDate,
        startTime,
        vehicle: info.vehicle,
        deliveries: info.deliveries,
        driverID: '',
        status: 'created'
      })
      .then(() => {
        dispatch({ type: 'SERVICE_CREATED', info });
      })
      .catch(err => {
        dispatch({ type: 'SERVICE_ERROR', err });
      });
  };
};

export const createUser = newUser => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection('Usuarios')
      .where('email', '==', newUser.email)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(resp => {
              return db
                .collection('Usuarios')
                .doc(resp.user.uid)
                .set({
                  email: newUser.email,
                  userID: resp.user.uid,
                  hub: newUser.hub,
                  rol: newUser.rols,
                  firstName: newUser.firstName,
                  lastName: newUser.lastName
                });
            })
            .then(() => {
              dispatch({ type: 'SIGNUP_SUCCESS' });
            })
            .catch(err => {
              dispatch({ type: 'SIGNUP_ERROR', err });
            });
        }
        snapshot.forEach(doc => {
          dispatch({ type: 'USER_ALREADY_EXISTS', doc });
        });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};
