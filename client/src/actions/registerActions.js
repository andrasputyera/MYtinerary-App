import axios from 'axios';
import {USER_REGISTERED} from './types';

export const postUsers = (user) => dispatch => {

    axios.post(`/api/user/register`, user).then(res => {

    	if(user.provider){
    		localStorage.setItem("token", res.data.token);
        	localStorage.setItem("username", res.data.user.userName);
    	}
        dispatch({
            type: USER_REGISTERED,
            payload: res.data
        })
    }
    );
};


export const socialLoginUser = (user) => dispatch => {
    axios.post(`/api/user/socialLogin`, user).then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.userName);
        dispatch({
        type: USER_REGISTERED,
        payload: res.data
        })
    });
};
