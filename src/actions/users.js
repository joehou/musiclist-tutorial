import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
export const userClearList = () => ({ type: 'USER_CLEAR_LIST' });
export const userLookupFailure = error => ({ type: 'USER_LOOKUP_FAILURE', error });
export const userLookupSuccess = json => ({ type: 'USER_LOOKUP_SUCCESS', json });

// Look up a user
export function userLookup(username) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // API call
    await fetch(
      '/api/users/find',
      {
        method: 'POST',
        body: JSON.stringify({ username }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json.username) {
        return dispatch(userLookupSuccess(json));
      }
      return dispatch(userLookupFailure(new Error(json.error)));
    })
    .catch(error => dispatch(userLookupFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

const initialState = {
  username: '',
  albums: [],
  albumsPopulated: [],
  artists: [],
  artistsPopulated: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'MUSIC_ALBUMS_POPULATE_FAILURE': {
      const newState = Object.assign({}, state);
      newState.albumsPopulated = [];
      return newState;
    }
    case 'MUSIC_ALBUMS_POPULATE_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.albumsPopulated = action.json;
      return newState;
    }
    case 'MUSIC_ARTISTS_POPULATE_FAILURE': {
      const newState = Object.assign({}, state);
      newState.artistsPopulated = [];
      return newState;
    }
    case 'MUSIC_ARTISTS_POPULATE_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.artistsPopulated = action.json;
      return newState;
    }
    case 'USER_CLEAR_LIST':
    case 'USER_LOOKUP_FAILURE': {
      const newState = Object.assign({}, initialState);
      return newState;
    }
    case 'USER_LOOKUP_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.username = action.json.username;
      newState.albums = action.json.albums;
      newState.artists = action.json.artists;
      return newState;
    }
    default: {
      return state;
    }
  }
}
