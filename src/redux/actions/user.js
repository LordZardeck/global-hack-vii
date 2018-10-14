import firebase from '../../firebase';
import {createActions} from "redux-actions";

let unregisterAuthStateChange = null;

export const {changeAuth, updateUser} = createActions('CHANGE_AUTH', 'UPDATE_USER');

export function subscribeAuthStateChange() {
    return dispatch => {
        if (unregisterAuthStateChange !== null) {
            unregisterAuthStateChange();
            unregisterAuthStateChange = null;
        }

        unregisterAuthStateChange = firebase.auth().onAuthStateChanged(user => {
            dispatch(changeAuth(user));

            if (user === null) {
                dispatch(updateUser(null));
                return;
            }

            getUserDetails(user.uid).then(userDoc => {
                if(!userDoc.exists) {
                    return createUser(user.uid)(dispatch);
                }

                return dispatch(updateUser(userDoc.data()));
            });
        });
    };
}

export function getUserDetails(uid) {
    return firebase.firestore().collection('users').doc(uid).get();
}

export function createUser(uid) {
    return dispatch => {
        return firebase.firestore()
            .collection("users")
            .doc(uid)
            .set({
                // at this point, no other info is known
            })
            .get()
            .then(userDoc => dispatch(updateUser(userDoc.data())));
    }
}

export function populateUser(uid, data) {
    // TODO: Validation on data
    return firebase.firestore().collection("users").doc(uid).update(data);
}
