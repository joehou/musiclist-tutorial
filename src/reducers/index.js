import { combineReducers } from 'redux';
import AlbumsReducer from '../reducers/albums';
import AuthenticationReducer from '../reducers/authentication';
import ProgressReducer from '../reducers/progress';
import ErrorReducer from '../reducers/error'
import UserReducer from '../reducers/user';

const reducers = {
  albums: AlbumsReducer,
  authentication: AuthenticationReducer,
  progress: ProgressReducer,
  error: ErrorReducer,
  user: UserReducer
};

export default combineReducers(reducers);
