import axios from 'axios';
import {USER_REGISTERED} from './types';

export const postUsers = (user) => dispatch => {
    console.log(user);
    axios.post(`/api/user/register`, user).then(res => {
        dispatch({
        type: USER_REGISTERED,
        payload: res.data
        })
    }
    );
};