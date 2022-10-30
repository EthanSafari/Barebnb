const express = require('express');

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:spotImageId', requireAuth, async (req, res, next) => {
    const { spotImageId } = req.params;
    const findSpotImage = await SpotImage.findByPk(spotImageId);
    if (!findSpotImage) {
        const err = new Error;
        err.status = 404;
        err.message = "Spot Image couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
    await findSpotImage.destroy();
    return res.status(200).json({ message: 'Successfully Deleted' });
});

module.exports = router;
