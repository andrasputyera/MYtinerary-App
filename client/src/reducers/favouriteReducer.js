import { ADD_FAVOURITE_ITINERARY, GET_FAVOURITE_ITINERARY } from "../actions/types";

const initState = {
  favourites: [],
  user: {}
};

const favouriteReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_FAVOURITE_ITINERARY:
      return {
        ...state,
        favourites: [action.favItinerary, ...state.favourites],
        user: action.username
      };
    case GET_FAVOURITE_ITINERARY:
      return {
        ...state,
        favourites: action.favItinerary,
        user: action.username
      };
    default:
      return state;
  }
};

export default favouriteReducer;