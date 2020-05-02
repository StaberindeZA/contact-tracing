import { ADD_USER } from '../actionTypes';

// const initialState = {
//   user: {
//     userId: 123,
//     username: "PeterDefault",
//     status: "Postive"
//   }
// };

const initialState = {
  userId: "123"
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      const { userId, username, status } = action.payload;
      console.log("UserId2: ", userId);
      return {
        ...state,
        userId: userId,
        username: username,
        status: status
      };
    }
    default:
      return state;
  }
}