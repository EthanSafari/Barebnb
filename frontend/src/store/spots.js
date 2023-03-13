import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/getSpots';
const ADD_SPOT = 'spots/addSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const UPDATE_SPOT = 'spots/updateSpot';

const GET_SINGLE_SPOT = 'spots/getSingleSpot';

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

const singleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot,
    }
}

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

const updateSpot = (spotId, updatedSpot) => {
    return {
        type: UPDATE_SPOT,
        spotId,
        updatedSpot,
    };
};

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    dispatch(getSpots(data.Spots));
    return response;
};

export const getSingleSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(singleSpot(data));
    return response;
};

export const addNewSpot = (spot, previewImageUrl) => async dispatch => {
    const spotResponse = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });
    if (spotResponse.ok) {
        const spot = await spotResponse.json();
        const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: previewImageUrl,
                preview: true,
                spotId: spot.id,
            }),
        });
        const image = await imageResponse.json();
        spot.preview = image.url;
        dispatch(addSpot(spot));
        return spotResponse;
    };
};

export const deleteSpotById = (spotId) => async dispatch => {
    const spotResponse = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });
    if (spotResponse.ok) {
        dispatch(deleteSpot(spotId));
    };
};

export const updateSpotById = (spotId, updatedSpot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSpot),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateSpot(spotId, data));
        return response;
    };
};

const initialState = { spots: null, currentSpot: null };

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            newState = Object.assign({}, state);
            const allSpots = {};
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            newState.spots = allSpots;
            newState.currentSpot = null;
            return newState;
        case ADD_SPOT:
            newState = Object.assign({}, state);
            return { ...newState, spots: { ...newState.spots, [action.spot['id']]: action.spot } };
        case DELETE_SPOT:
            newState = { ...state };
            delete newState.spots[action.spotId];
            return newState;
        case UPDATE_SPOT:
            newState = Object.assign({}, state);
            return newState;
        case GET_SINGLE_SPOT:
            newState = Object.assign({}, state);
            newState.currentSpot = action.spot;
            return newState;
        default:
            return state;
    };
};

export const normalizeArray = (array) => {
    const object = {};
    const arr = array.slice();
    arr.forEach(element => {
        object[element.id] = element;
    });
    return object;
};

export default spotsReducer;
