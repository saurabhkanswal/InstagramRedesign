// import darkMode from '../reducer/darkMode';
import {SET_DARK_MODE} from './action.types';

export const darkMode = data => dispatch => {
  dispatch({
    type: SET_DARK_MODE,
    payload: data,
  });
};
