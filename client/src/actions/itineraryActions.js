import axios from 'axios';
import {ITINERARY_ACQUIRED} from './types';

export const getItineraries = (cityLink) => dispatch => {
    axios.get(`/api/itinerary/${cityLink}`).then(res => {
        dispatch({
        type: ITINERARY_ACQUIRED,
        payload: res.data
        })
    }
    );
};