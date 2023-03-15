const express = require('express');

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params;
    const findBooking = await Booking.findByPk(bookingId);
    if (!findBooking) {
        const err = new Error;
        err.status = 404;
        err.message = "Booking couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
    if ((new Date()) > (new Date(findBooking.dataValues.startDate))) {
        const err = new Error;
        err.status = 403;
        err.message = "Bookings that have been started can't be deleted";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
    await findBooking.destroy();
    return res.status(200).json({ message: 'Successfully Deleted' });
});

router.put('/:bookingId', requireAuth, handleValidationErrors, async (req, res, next) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const findBooking = await Booking.findByPk(bookingId);
    const findBookings = await Booking.findAll({
        where: {
            id: bookingId,
        },
    });
    if (!findBooking) {
        const err = new Error;
        err.status = 404;
        err.message = "Booking couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
    if (findBookings.length) {
        findBookings.forEach(booking => {
            if (booking.dataValues.startDate <= startDate && booking.dataValues.endDate >= endDate) {
                const err = new Error;
                err.message = "Sorry, this spot is already booked for the specified dates";
                err.status = 403;
                err.errors = {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking",
                };
                res.status(err.status).json({ errorCode: err.status, message: err.message, errors: err.errors });
                throw err;
            };
        });
    };
    if (startDate > endDate) {
        const err = new Error;
        err.message = "Validation error";
        err.status = 400;
        err.errors = {
            "endDate": "endDate cannot come before startDate"
        };
        res.status(err.status).json({ errorCode: err.status, message: err.message, errors: err.errors });
        throw err;
    };
    if (new Date(startDate) < new Date() || new Date(endDate) < new Date()) {
        const err = new Error;
        err.message = "Past bookings can't be modified";
        err.status = 403;
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        throw err;
    };
    findBooking.update({
        startDate,
        endDate,
    });
    return res.status(200).json(findBooking);
});

// allows a current user to view all the existing bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const bookings = {};
    const bookingArray = [];
    let booking;
    const findCurrentUserBookings = await Booking.findAll({
        attributes: {
            include: ['id'],
            exclude: ['createdAt', 'updatedAt'],
        },
        where: {
            userId: req.user.id,
        },
    });
    for (let i = 0; i < findCurrentUserBookings.length; i++) {
        booking = findCurrentUserBookings[i];
        booking = booking.toJSON();
        let findSpot = await Spot.findByPk(booking.spotId);
        findSpot = findSpot.toJSON();
        const findPreviewImage = await SpotImage.findOne({
            where: {
                id: booking.spotId,
                preview: true,
            },
        });
        findSpot.previewImage = findPreviewImage.dataValues.url;
        booking.Spot = findSpot;
        bookingArray.push(booking);
    };
    bookings.Bookings = bookingArray;
    return res.status(200).json(bookings);
});

module.exports = router;
