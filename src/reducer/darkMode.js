import {SET_DARK_MODE} from '../action/action.types';

const initialState = {
  IsdarkMode: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return {
        ...state,
        IsdarkMode: action.payload,
      };
    default:
      return state;
  }
};
