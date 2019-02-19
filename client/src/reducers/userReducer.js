import {USER_REGISTERED, LOGIN_REQUEST, AUTH_SIGN_UP} from '../actions/types';

const initState = {
    users: {},
    isAuthenticated: false,
    token: "",
    errorMessage: ""
};
    
    const userReducer = (state = initState, action) => {
        switch (action.type) {
            case USER_REGISTERED:
            return {
            ...state,
            users: action.payload
        };
            case LOGIN_REQUEST:
            return {
            ...state,
            users: action.payload
        };
            case AUTH_SIGN_UP:
            return {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            isAuthenticated: true,
            errorMessage: ""
        };

        default:
        return state;
    }
};
    
    export default userReducer;