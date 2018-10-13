import { combineReducers } from 'redux';
import knowledgebase from './knowledgebase';
import registration from './registration';

export default combineReducers({ knowledgebase, registration });

