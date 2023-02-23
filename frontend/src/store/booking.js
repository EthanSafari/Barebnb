import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'bookings/getAllBookings';
const CREATE_BOOKING = 'bookings/createBooking';
const DELETE_BOOKING = 'bookings/deleteBooking';
const UPDATE_BOOKING = 'bookings/updateBooking';

const getAllBookings = (bookings) => {
    return {
        type: GET_BOOKINGS,
        bookings,
    };
};

const createNewBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking,
    };
};

const deleteCurrentBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId,
    };
};

const  updateCurrentBooking = (booking) => {
    return {
        type: UPDATE_BOOKING,
        booking,
    };
};

export const getBookings = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
    
}