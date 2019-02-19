import {combineReducers} from 'redux';
import cityReducer from './cityReducer';
import itineraryReducer from './itineraryReducer';
import activityReducer from './activityReducer';
import commentReducer from './commentReducer';
import userReducer from './userReducer';
import favouriteReducer from './favouriteReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
    reducerOne: cityReducer,
    reducerTwo: itineraryReducer,
    reducerThree: activityReducer,
    reducerFour: commentReducer,
    reducerFive: userReducer,
    reducerSix: favouriteReducer,
    reducerSeven: profileReducer
    
});

export default rootReducer;