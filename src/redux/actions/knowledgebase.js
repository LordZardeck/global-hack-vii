import {createActions} from 'redux-actions';
import firebase from '../../firebase';

export const {receiveResourcesSnapshot} =
    createActions('RECEIVE_RESOURCES_SNAPSHOT');

let unregisterAllGoalsCollectionObserver = null;

export function subscribeResources() {
    return dispatch => {
        if (unregisterAllGoalsCollectionObserver !== null) {
            unregisterAllGoalsCollectionObserver();
            unregisterAllGoalsCollectionObserver = null;
        }

        unregisterAllGoalsCollectionObserver =
            firebase.firestore()
                .collection('goals')
                .orderBy('title', 'asc')
                .limit(100 /* @todo */)
                .onSnapshot(snapshot => {
                    const resources = snapshot.docs;

                    dispatch(receiveResourcesSnapshot(resources));
                });
    };
}

