import { SET_AUTH } from '../actionTypes';

const initialState = {
  isAuthenticated: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH: {
      return {
        isAuthenticated: action.isAuthenticated
      }
    }
    default:
      return state;
  }
}