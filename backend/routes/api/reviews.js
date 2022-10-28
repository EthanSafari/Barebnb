const express = require('express');

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { url } = req.body;

    const findReview = await Review.findByPk(reviewId);
    if (findReview) {
        const addReviewImage = ReviewImage.build({
            reviewId: reviewId,
            url,
        });
        const findReviewAmount = await ReviewImage.findAll({
            where: {
                reviewId: reviewId,
            },
        });
        console.log(findReviewAmount)
        if (findReviewAmount.length < 10 ) {
            await addReviewImage.save();
            return res.status(200).json({ id: addReviewImage.id, url: addReviewImage.url });
        } else {
            const err = new Error;
            err.status = 403;
            err.message = "Maximum number of images for this resource was reached";
            res.status(err.status).json({ errorCode: err.status, message: err.message });
            next(err);
        };
    };
    const err = new Error;
    err.status = 404;
    err.message = "Review couldn't be found";
    res.status(err.status).json({ errorCode: err.status, message: err.message });
    next(err);
});


module.exports = router;
