import { GET_USER } from "./types";
import axios from "axios";

let config = {
  withCredentials: true,
  headers: { Authorization: "Bearer " + localStorage.getItem("token") ,token:localStorage.getItem("token") }
};

export const getProfile = () => dispatch => {
  axios.get(`/api/profiles`,  config).then(res => {
  	    console.log("profile get========",res.data);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  });
};