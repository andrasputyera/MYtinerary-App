import { ADD_FAVOURITE_ITINERARY, GET_FAVOURITE_ITINERARY } from "./types";
import axios from "axios";

export const getFavItinerary = (user) => {
  return {
    type: GET_FAVOURITE_ITINERARY,
  };
};

export const addFavItinerary = (
  favItinerary,
  username,
  favButtonActive
) => dispatch => {
  console.log("selected is " + favItinerary);
  console.log("username is " + username);
  console.log("fav button is" + favButtonActive);

  axios
    .put(`/favourites`, {
      favItinerary,
      username,
      favButtonActive
    })
    .then(response => {
      dispatch({
        type: ADD_FAVOURITE_ITINERARY,
        favItinerary,
        username,
        favButtonActive,
        payload: response.data
      });
    });
};