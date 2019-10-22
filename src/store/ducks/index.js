import { combineReducers } from 'redux';
import authReducer from './auth'
import visitReducer from './visit'

const reducers = combineReducers({
  authReducer,
  visitReducer
});

export default reducers;
