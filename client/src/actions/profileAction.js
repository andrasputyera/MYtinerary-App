import { GET_USER } from "./types";
import axios from "axios";

let config = {
  withCredentials: true,
  headers: { Authorization: "Bearer " + localStorage.getItem("user") }
};

export const getProfile = () => dispatch => {
  axios.get(`/profiles`, {}, config).then(res => {
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  });
};