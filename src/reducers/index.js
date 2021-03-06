import { combineReducers } from 'redux';
import ArtistsReducer from '../reducers/artists';
import AlbumsReducer from '../reducers/albums';
import AuthenticationReducer from '../reducers/authentication';
import ProgressReducer from '../reducers/progress';
import LatestReducer from '../reducers/latest';
import ListReducer from '../reducers/list';
import ErrorReducer from '../reducers/error'
import UserReducer from '../reducers/user';

const reducers = {
  artists: ArtistsReducer,
  albums: AlbumsReducer,
  authentication: AuthenticationReducer,
  progress: ProgressReducer,
  latest: LatestReducer,
  list: ListReducer,
  error: ErrorReducer,
  user: UserReducer
};

export default combineReducers(reducers);
