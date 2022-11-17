import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews';

const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews,
    };
};

export const getSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getReviews(data.Reviews));
    return response;
};

const initialState = { reviews: null };

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = Object.assign({}, state);
            newState.reviews = action.reviews;
            return newState;
        default:
            return state;
    };
};

export default reviewsReducer;
