import { combineReducers } from 'redux';
import knowledgebase from './knowledgebase';
import registration from './registration';
import user from './user';

export default combineReducers({ knowledgebase, registration, user });

