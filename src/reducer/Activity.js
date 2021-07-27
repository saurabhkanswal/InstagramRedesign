import {SET_ACTIVITY} from '../action/action.types';

const initialState = {
  ActivityList: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITY:
      return {
        ...state,
        ActivityList: action.payload,
      };
    default:
      return state;
  }
};
