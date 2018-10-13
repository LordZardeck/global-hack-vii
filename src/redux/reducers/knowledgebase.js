import {handleActions} from 'redux-actions';
import {
    receiveResourcesSnapshot
} from '../actions/knowledgebase';

const initialState = {
    resources: []
};

const knowledgebase = handleActions(
    {
        [receiveResourcesSnapshot]: (state, {payload}) => {
            const resources = {};

            payload.forEach(resource => {
                resources[resource.id] = {
                    ...resource.data(),
                    id: resource.id
                };
            });

            return ({
                ...state,
                resources
            });
        }
    },
    initialState
);

export default knowledgebase;

