import {SET_POST, ERROR_POST, SET_POST_LOADING, SET_POST_COMMENT} from '../action/action.types'

const initialState = {
  posts: null,
  loading: false,
  error: false,
  selectedPostComment: []
}

export default (state=initialState, action) => {
  switch (action.type) {
    case SET_POST:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: false
      }
      case ERROR_POST:
        return {
          ...state,
          error: true
        }
      case SET_POST_LOADING:
        return {
          ...state,
          loading: action.payload
        }
      case SET_POST_COMMENT:
        return {
          ...state,
          selectedPostComment: action.payload
        }
  
    default:
      return state
  }
}