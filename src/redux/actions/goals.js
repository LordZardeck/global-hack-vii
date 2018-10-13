import {createActions} from 'redux-actions';
import firebase from '../../firebase';

export const {receiveGoalsSnapshot} =
    createActions('RECEIVE_GOALS_SNAPSHOT');

let unregisterAllGoalsCollectionObserver = null;

export function subscribeGoals() {
    return dispatch => {
        if (unregisterAllGoalsCollectionObserver !== null) {
            unregisterAllGoalsCollectionObserver();
            unregisterAllGoalsCollectionObserver = null;
        }

        unregisterAllGoalsCollectionObserver =
            firebase.firestore().collection('goals').orderBy('title', 'asc').limit(100 /* @todo */).onSnapshot(snapshot => {
                const goals = snapshot.docs;

                dispatch(receiveGoalsSnapshot(goals));
            });
    };
}

