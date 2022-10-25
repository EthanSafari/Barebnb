const express = require('express');

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const e = require('express');

const router = express.Router();


const where = {};

router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const createSpot = Spot.build({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    });
    if (createSpot) {
        await createSpot.save();
        return res.status(201).json(createSpot);
    } else {
        const err = new Error;
        err.status = 400;
        err.message = {
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "address": "Street address is required",
              "city": "City is required",
              "state": "State is required",
              "country": "Country is required",
              "lat": "Latitude is not valid",
              "lng": "Longitude is not valid",
              "name": "Name must be less than 50 characters",
              "description": "Description is required",
              "price": "Price per day is required"
            },
          };
        next(err);
    };
});

// gets all the spots, however, it does not get the averageRating or the previewImage url
router.get('/', async (req, res, next) => {
    const spots = {};
    const allSpots = await Spot.findAll({
        attributes: {
            exclude: ['spotId'],
        },
        where,
    });

    const spotArray = [];
    const avgRating = async () => {
        const ratingArray = [];
        for (let index = 0; index < allSpots.length; index++) {
            const element = allSpots[index].id;
            const findRating = await Review.findOne({
                where: {
                    spotId: element,
                },
                attributes: {
                    exclude: ['reviewId'],
                    include: [
                        [
                            sequelize.fn("AVG", sequelize.col("stars")),
                            "avgRating",
                        ],
                    ],
                },
            })
            ratingArray.push(findRating.dataValues.avgRating);
        };
        return ratingArray;
    };
    const avgRatingsArray = avgRating();
    for (let index = 0; index < allSpots.length; index++) {
        let spot = allSpots[index];
        spot = spot.toJSON();
        spot.avgRating = avgRatingsArray[index];
        spotArray.push(spot);
    };

    spots.Spots = spotArray;
    if (allSpots.length) return res.status(200).json(spots);
    else {
        const err = new Error;
        err.status = 500;
        err.message = 'Looks like all available spots are unavailable. Sorry for the inconvenience!';
        next(err);
    };
});

module.exports = router;
