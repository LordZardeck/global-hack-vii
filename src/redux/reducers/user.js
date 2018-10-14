import {handleActions} from 'redux-actions';
import {changeAuth, updateUser} from '../actions/user';

const initialState = {
    currentUser: null,
    authUser: null,
    sessionInitialized: false,
    userInitialized: false
};

const user = handleActions(
    {
        [changeAuth]: (state, {payload}) => ({...state, authUser: payload, sessionInitialized: true}),
        [updateUser]: (state, {payload}) => ({...state, currentUser: payload, userInitialized: true})
    },
    initialState
);

export default user;

