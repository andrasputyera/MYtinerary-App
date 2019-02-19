import { GET_USER } from "../actions/types";

const initialState = {
  profile: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      console.log("reducer");
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}