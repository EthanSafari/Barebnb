const express = require('express');

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

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
        bookingArray.push(booking)
    };
    bookings.Bookings = bookingArray;
    return res.status(200).json(bookings);
});

module.exports = router;
