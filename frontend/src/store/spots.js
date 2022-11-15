const GET_SPOTS = 'spots/getSpots';

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    const data =  await response.json();
    dispatch(getSpots(data.Spots));
    return response;
};

const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            newState = Object.assign({}, state);
            newState.spots = action.spots;
            return newState;
        default:
            return state;
    };
};

export default spotsReducer;
