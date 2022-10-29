const express = require('express');

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
    const bookings = {};
    const findCurrentUserBookings = await Booking.findAll({
        attributes: {
            include: ['id'],
            exclude: ['createdAt', 'updatedAt'],
        },
        where: {
            userId: req.user.id,
        },
        include: {
            model: Spot,
            include: {
                model: SpotImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'spotId', 'id', 'preview'],
                },
            }
         },
    });
    bookings.Bookings = findCurrentUserBookings;
    return res.status(200).json(bookings);
});

module.exports = router;
