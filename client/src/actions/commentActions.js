import axios from 'axios';
import {COMMENT_ACQUIRED} from './types';
import {COMMENT_POSTED} from './types';

export const getComments = (id) => dispatch => {
    axios.get(`/api/comments/${id}`).then(res => {
        dispatch({
        type: COMMENT_ACQUIRED,
        payload: res.data
        })
    }
    );
};



export const postComments = (comment) => dispatch => {
    axios.post(`/api/comments`,comment, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(res => {
    
        dispatch({
        type: COMMENT_POSTED,
        payload: res.data
        })
    }
    );
};