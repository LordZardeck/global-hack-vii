import {createActions} from 'redux-actions';
import firebase from '../../firebase';

export const {receiveResourcesSnapshot} =
    createActions('RECEIVE_RESOURCES_SNAPSHOT');

let unregisterAllGoalsCollectionObserver = null;

export function getResource(resourceId) {
    return firebase.firestore()
        .doc(`/goals/${resourceId}`)
        .get();
}

export function getTasks(resourceId) {
    return firebase.firestore()
        .doc(`/goals/${resourceId}`)
        .collection('tasks')
        .get()
        .then(tasksDocs => Promise.all(tasksDocs.docs.map(taskDoc => firebase.firestore().doc(`/goals/${taskDoc.id}`).get())));
}

export function subscribeResources() {
    return dispatch => {
        if (unregisterAllGoalsCollectionObserver !== null) {
            unregisterAllGoalsCollectionObserver();
            unregisterAllGoalsCollectionObserver = null;
        }

        unregisterAllGoalsCollectionObserver =
            firebase.firestore()
                .collection('goals')
                .onSnapshot(snapshot => {
                    const resources = snapshot.docs;

                    dispatch(receiveResourcesSnapshot(resources));
                });
    };
}

