import {handleActions} from 'redux-actions';
import {
    receiveGoalsSnapshot
} from '../actions/goals';

const initialState = {
    goals: []
};

const goals = handleActions(
    {
        [receiveGoalsSnapshot]: (state, {payload}) => {
            const goals = {};

            payload.forEach(goal => {
                goals[goal.id] = goal.data();
            });

            return ({
                ...state,
                goals
            });
        }
    },
    initialState
);

export default goals;

