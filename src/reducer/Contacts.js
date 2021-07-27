import {SET_CONTACTS, SET_CONTACTS_LOADING} from '../action/action.types';

const initialState = {
  contacts: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case SET_CONTACTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
