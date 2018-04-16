import { combineReducers } from 'redux';
import AuthenticationReducer from '../reducers/authentication';
import ProgressReducer from '../reducers/progress';
import ErrorReducer from '../reducers/error'

const reducers = {
  authentication: AuthenticationReducer,
  progress: ProgressReducer,
  error: ErrorReducer
};

export default combineReducers(reducers);