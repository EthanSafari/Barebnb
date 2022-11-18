import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews';
const CREATE_REVIEW = 'reviews/createReview';

const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews,
    };
};

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review,
    };
};

export const getSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getReviews(data.Reviews));
    return response;
};

export const createReviewForSpot = (spotId, review) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createReview(data));
        return response;
    } else throw Error;
};

const initialState = { reviews: null };

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = Object.assign({}, state);
            newState.reviews = action.reviews;
            return newState;
        case CREATE_REVIEW:
            newState = Object.assign({}, state);
            return { ...newState, reviews: { ...newState.reviews, [action.review['id']]: action.review } }
        default:
            return state;
    };
};

export default reviewsReducer;
