import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'bookings/getBookings';
const ADD_BOOKING = 'bookings/addBooking';
const DELETE_BOOKING = 'bookings/deleteBooking';
const UPDATE_BOOKING = 'bookings/updateBooking';



const getBookings = (bookings) => {
    return {
        type: GET_BOOKINGS,
        bookings,
    };
};

const addBooking = (booking) => {
    return {
        type: ADD_BOOKING,
        booking,
    };
};

const deleteBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId,
    };
};

const updateBooking = (booking) => {
    return {
        type: UPDATE_BOOKING,
        booking,
    };
};



export const getAllBookings = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getBookings(data));
        return data;
    };
};

export const createNewBooking = (booking) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${booking.spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
    });
    // console.log(await res.json())
    if (res.ok) {
        const data = await res.json();
        dispatch(addBooking(data));
        return data;
    };
};

export const updateExistingBooking = (booking) => async dispatch => {
    const res = await csrfFetch(`/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(updateBooking(data));
        return data;
    };
};

export const deleteExistingBooking = (bookingId) => async dispatch => {
    const res = await csrfFetch(`/bookings/${bookingId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(deleteBooking(bookingId));
        return data;
    };
};



const initialState = { bookings: {} };

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_BOOKINGS:
            newState = { bookings: {} };
            action.bookings.Bookings.forEach(booking => {
                newState.bookings[booking.id] = booking;
            });
            return newState;

        case ADD_BOOKING:
            newState = { bookings: {...state.bookings} };
            newState.bookings[action.booking.id] = action.booking;
            return newState;

        case UPDATE_BOOKING:
            newState = { bookings: {...state.bookings} };
            newState.bookings[action.booking.id] = action.booking;
            return newState;

        case DELETE_BOOKING:
            newState = { bookings: {...state.bookings} };
            delete newState.bookings[action.bookingId];
            return newState;

        default:
            return state;
    };
};

export default bookingsReducer;
