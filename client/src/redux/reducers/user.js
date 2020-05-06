import { ADD_USER } from '../actionTypes';

const initialState = {
  userId: "123"
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...action.payload
      }
    }
    default:
      return state;
  }
}