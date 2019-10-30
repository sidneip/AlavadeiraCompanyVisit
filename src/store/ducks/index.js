import { combineReducers } from 'redux';
import { reducer as offline } from 'redux-offline-queue'
import authReducer from './auth'
import visitReducer from './visit'

const reducers = combineReducers({
  offline,
  authReducer,
  visitReducer
});

export default reducers;
