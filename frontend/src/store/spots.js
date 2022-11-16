import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/getSpots';
const ADD_SPOT = 'spots/addSpot';
const DELETE_SPOT = 'spots/deleteSpot';

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot,
    };
};

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId,
    };
};

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    dispatch(getSpots(data.Spots));
    return response;
};

export const addNewSpot = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(addSpot(spot));
        return response;
    } else throw Error;
};

export const deleteSpotById = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteSpot(spotId));
     } else throw Error;
};

const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            newState = Object.assign({}, state);
            newState.spots = action.spots;
            return newState;
        case ADD_SPOT:
            newState = Object.assign({}, state);
            return { ...newState, spots: { ...newState.spots, [action.spot['id']]: action.spot } };
        case DELETE_SPOT:
            const copyState = {...state};
            newState = {...state};
            newState.session = copyState.session;
            const spots = Object.values(copyState.spots);
            const spotsObject = normalizeArray(spots);
            newState.spots = spotsObject;
            delete newState.spots[action.spotId];
            return newState;
        default:
            return state;
    };
};

const normalizeArray = (array) => {
    const object = {};
    const arr = array.slice();
    arr.forEach(element => {
        object[element.id] = element;
    });
    return object;
};

export default spotsReducer;
