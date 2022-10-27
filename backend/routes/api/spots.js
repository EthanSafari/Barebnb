const express = require('express');

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const findSpotById = await Spot.findByPk(spotId, {
        attributes: {
            exclude: ['spotId'],
        },
    });
    if (findSpotById) {
        findSpotById.update({
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
        res.status(200).json(findSpotById);
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
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
});

// allows for an authorized user to add images to their spots
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { url, preview } = req.body;

    let getSpotById = await Spot.findByPk(spotId, {
        attributes: {
            exclude: ['spotId'],
        },
    });
    if (getSpotById) {
        const newRelationship = await SpotImage.create({
            spotId: spotId,
            url,
            preview,
        });
        return res.status(200).json(newRelationship);
    } else {
        const err = new Error;
        err.status = 404;
        err.message = "Spot couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
});

// allows an authorized user to create a new listing
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
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
});

// gets all the spots of the current user
router.get('/current', requireAuth, async (req, res, next) => {
    const spots = {};
    const spotArray = [];
    let spot;
    let rating;

    for (let i = 1; i < Infinity; i++) {
        spot = await Spot.findByPk(i, {
            attributes: {
                exclude: ['spotId'],
            },
        });
        if (!spot) break;
        else {
            spot = spot.toJSON();
            rating = await Review.findByPk(i, {
                attributes: {
                    exclude: ['reviewId'],
                    include: ['stars',
                        [
                            sequelize.fn("AVG", sequelize.col("stars")),
                            "avgRating",
                        ],
                    ],
                },
                where: {
                    spotId: spot.id,
                },
            });
            imagePreview = await SpotImage.findOne({
                attributes: {
                    exclude: ['spotId'],
                },
                where: {
                    spotId: i,
                },
            });
            spot.avgRating = (rating.dataValues.avgRating) ? rating.dataValues.avgRating
                : `${spot.name} has yet to be rated!`;
            spot.previewImage = (imagePreview !== null) ? imagePreview.dataValues.url
                : `${spot.name} doesn't have a preview image!`;
            if (spot.ownerId === req.user.id) spotArray.push(spot);
        };
    };
    spots.Spots = spotArray;
    return res.status(200).json(spots);
})

// need to fix avgStarRating for the response ******************************************************************************
router.get('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    let findSpotById = await Spot.findByPk(spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview'],
            },
            {
                model: User,
                attributes: []
            },
            {
                model: Review,
                attributes: [],
            },
        ],
    });
    if (findSpotById) {
        findSpotById = findSpotById.toJSON();
        const findOwner = await User.findByPk(findSpotById.ownerId, {
            attributes: {
                exclude: ['userId', 'username'],
            },
            group: ['id', 'firstName', 'lastName', 'username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'],
        });
        const ratingCount = await Review.findOne({
            attributes: {
                include: [
                    [
                        sequelize.fn("COUNT", sequelize.col("stars")),
                        "reviewCount",
                    ],
                ],
            },
            where: {
                userId: findSpotById.ownerId,
            },
            group: ['spotId', 'userId', 'stars', 'review', 'updatedAt', 'createdAt'],
        });
        const ratingTotal = await Review.findOne({
            attributes: {
                include: [
                    [
                        sequelize.fn("SUM", sequelize.col("stars")),
                        "totalStars",
                    ],
                ],
            },
            where: {
                spotId: spotId,
            },
            group: ['spotId', 'userId', 'stars', 'review', 'updatedAt', 'createdAt'],
        });
        console.log(ratingTotal)
        findSpotById.Owner = findOwner;
        findSpotById.numReviews = ratingCount.dataValues.reviewCount;
        findSpotById.avgStarRating = (ratingTotal.dataValues.totalStars)
            ? ratingTotal.dataValues.totalStars / ratingCount.dataValues.reviewCount
            : 0;
        return res.status(200).json(findSpotById);
    } else {
        const err = new Error;
        err.status = 404;
        err.message = "Spot couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
});

// gets all the spots
router.get('/', async (req, res, next) => {
    const spots = {};
    const spotArray = [];
    let spot;
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: [],
            },
        ],
        attributes: {
            exclude: ['updatedAt', 'createdAt'],
        },
    });
    for (let i = 0; i < allSpots.length; i++) {
        spot = allSpots[i];
        const ratings = await Review.findAll({
            where: {
                spotId: spot.dataValues.id,
            },
            attributes: {
                include: [
                    [
                        sequelize.fn("SUM", sequelize.col("stars")),
                        "totalStars",
                    ],
                ],
            },
            group: ['spotId', 'userId', 'review', 'stars', 'updatedAt', 'createdAt'],
        });
        const previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.dataValues.id,
            },
            group: ['id', 'spotId', 'preview', 'url', 'updatedAt', 'createdAt'],
        });
        spot = spot.toJSON();
        spot.avgRating = (ratings.length)
            ? Number(ratings[0].dataValues.totalStars / ratings.length)
            : `${spot.name} doesn't have any reviews yet!`;
        spot.preview = (previewImage !== null)
            ? previewImage.url : `${spot.name} doesn't have a preview!`;
        spotArray.push(spot);
    };
    spots.Spots = spotArray;
    res.status(200).json(spots);
});


module.exports = router;
