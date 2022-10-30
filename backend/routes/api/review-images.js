const express = require('express');

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:reviewImageId', requireAuth, async (req, res, next) => {
    const { reviewImageId } = req.params;
    const findReviewImage = await ReviewImage.findByPk(reviewImageId);
    if (!findReviewImage) {
        const err = new Error;
        err.status = 404;
        err.message = "Review Image couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
    await findReviewImage.destroy();
    return res.status(200).json({ message: 'Successfully Deleted' });
});

module.exports = router;
