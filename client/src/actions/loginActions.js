import axios from 'axios';
import {LOGIN_REQUEST, AUTH_SIGN_UP} from './types';

export const loginUsers = (user) => dispatch => {
    axios.post(`/api/user/login`, user).then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        dispatch({
        type: LOGIN_REQUEST,
        payload: res.data
        })
    });
};

// export const googleLogin = () => dispatch => {
//     axios.get(`/auth/google`)
//       .then(res => {
//         localStorage.setItem("user", res.data.token);
//         dispatch({
//           type: GOOGLE_LOGIN,
//           payload: res.data
//         });
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   };

  export const oauthGoogle = data => {
    return async dispatch => {
      const res = await axios.post("/auth/google", {
        access_token: data
      });
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data
      });
      localStorage.setItem("user", res.data.token);
    };
  };