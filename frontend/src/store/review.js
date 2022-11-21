import { csrfFetch } from "./csrf";
import { normalizeArray } from "./spots";

const GET_REVIEWS = 'reviews/getReviews';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';

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

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId,
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
    };
};

export const deleteReviewById = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteReview(reviewId));
    };
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
            return { ...newState, reviews: { ...newState.reviews, [action.review['id']]: action.review } };
        case DELETE_REVIEW:
            const copyState = {...state};
            newState = {...state};
            newState.reviews = copyState.reviews;
            const reviews = Object.values(copyState.reviews);
            const reviewsObject = normalizeArray(reviews);
            newState.reviews = reviewsObject;
            delete newState.reviews[action.reviewId];
            return newState;
        default:
            return state;
    };
};

export default reviewsReducer;
