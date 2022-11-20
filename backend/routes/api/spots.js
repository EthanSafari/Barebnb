const express = require('express');

const { Spot, User, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const e = require('express');

const router = express.Router();

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const findSpot = await Spot.findByPk(spotId);
    if (!findSpot) {
        const err = new Error;
        err.status = 404;
        err.message = "Spot couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
    await findSpot.destroy();
    return res.status(200).json({ message: 'Successfully Deleted' });
});

// allows an authorized user to update a spots information
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
        err.status = 404;
        err.message = "Spot couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
});

// allows a user to create a booking for a spot given the spots id
router.post('/:spotIdForBooking/bookings', requireAuth, async (req, res, next) => {
    const { spotIdForBooking } = req.params;
    const { startDate, endDate } = req.body;
    const findSpot = await Spot.findByPk(spotIdForBooking);
    const findSpotsBookings = await Booking.findAll({
        where: {
            spotId: spotIdForBooking,
        },
    });
    if (!findSpot) {
        const err = new Error;
        err.status = 404;
        err.message = "Spot couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
    if (!startDate || !endDate) {
        const err = new Error;
        err.message = "Validation error";
        err.status = 400;
        err.errors = {
            "review": "Review text is required",
            "stars": "Stars must be an integer from 1 to 5",
        };
        res.status(err.status).json({ errorCode: err.status, message: err.message, errors: err.errors });
        next(err);
    };
    const createBooking = Booking.build({
        userId: req.user.id,
        spotId: Number(spotIdForBooking),
        startDate,
        endDate,
    });
    if (findSpotsBookings.length) {
        findSpotsBookings.forEach(booking => {
            if (booking.dataValues.startDate <= startDate && booking.dataValues.endDate >= endDate
                || booking.dataValues.userId == createBooking.userId) {
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
        }
        res.status(err.status).json({ errorCode: err.status, message: err.message, errors: err.errors });
        throw err;
    };
    await createBooking.save();
    return res.status(200).json(createBooking);
});

// allows an authorized user to post reviews about a spot
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;

    const getSpotById = await Spot.findByPk(spotId);
    if (getSpotById) {
        const spotsReviews = await Review.findAll({
            where: {
                spotId: Number(spotId),
            },
        });
        spotsReviews.forEach(review => {
            if (review.dataValues.userId === req.user.id) {
                const err = new Error;
                err.status = 403;
                err.message = "User already has a review for this spot";
                res.status(err.status).json({ errorCode: err.status, message: err.message });
                throw err;
            };
        });
        const { review, stars } = req.body;
        if (review && stars) {
            const createReview = await Review.create({
                spotId: parseInt(spotId),
                userId: req.user.id,
                review,
                stars,
            });
            return res.status(201).json(createReview);
        } else {
            const err = new Error;
            err.status = 400;
            err.message = "Validation error";
            err.errors = {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            };
            res.status(err.status).json({ errorCode: err.status, message: err.message, errors: err.errors });
            next(err);
        };
    } else {
        const err = new Error;
        err.status = 404;
        err.message = "Spot couldn't be found";
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
            spotId: Number(spotId),
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
        err.message = "Validation Error";
        err.errors = {
            "address": "Street address is required",
            "city": "City is required",
            "state": "State is required",
            "country": "Country is required",
            "lat": "Latitude is not valid",
            "lng": "Longitude is not valid",
            "name": "Name must be less than 50 characters",
            "description": "Description is required",
            "price": "Price per day is required"
        };
        res.status(err.status).json({ errorCode: err.status, message: err.message, errors: err.errors });
        next(err);
    };
});

// gets all the spots of the current user
router.get('/current', requireAuth, async (req, res, next) => {
    const spots = {};
    const spotArray = [];

    const getAllSpotsCurrentUser = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: SpotImage,
                attributes: [],
            },
            {
                model: Review,
                attributes: [],
            },
        ],
    });
    if (getAllSpotsCurrentUser.length) {
        for (let i = 0; i < getAllSpotsCurrentUser.length; i++) {
            let spot = getAllSpotsCurrentUser[i];
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
                    spotId: spot.dataValues.id,
                },
                group: ['id', 'spotId', 'userId', 'stars', 'review', 'updatedAt', 'createdAt'],
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
                    spotId: spot.dataValues.id,
                },
                group: ['id', 'spotId', 'userId', 'stars', 'review', 'updatedAt', 'createdAt'],
            });
            const previewImage = await SpotImage.findOne({
                where: {
                    spotId: spot.dataValues.id,
                },
                group: ['id', 'spotId', 'preview', 'url', 'updatedAt', 'createdAt'],
            });
            spot = spot.toJSON();
            spot.avgRating = (ratingTotal !== null)
                ? ratingTotal.dataValues.totalStars / ratingCount.dataValues.reviewCount : 0;
            spot.previewImage = (previewImage !== null)
                ? previewImage.url : `${spot.name} doesn't have a preview!`;
            spotArray.push(spot);
        };
        spots.Spots = spotArray;
        return res.status(200).json(spots)
    } else res.status(200).json({ message: 'You currently have no spots!' });
});

router.get('/:spotIdForBooking/bookings', requireAuth, async (req, res, next) => {
    let { spotIdForBooking } = req.params;
    spotIdForBooking = parseInt(spotIdForBooking);
    const bookings = {};
    const findSpot = await Spot.findByPk(spotIdForBooking);
    if (!findSpot) {
        const err = new Error;
        err.status = 404;
        err.message = "Spot couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
    if (req.user.id === findSpot.dataValues.ownerId) {
        const ownerResponse = await Booking.findAll({
            where: {
                spotId: spotIdForBooking,
            },
            attributes: {
                include: ['id'],
            },
            include: {
                model: User,
                attributes: {
                    exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email'],
                },
            },
        });
        bookings.Bookings = ownerResponse;
        return res.status(200).json(bookings);
    } else {
        const clientResponse = await Booking.findAll({
            where: {
                spotId: spotIdForBooking,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId'],
            },
        });
        bookings.Bookings = clientResponse;
        return res.status(200).json(bookings);
    };
});

//gets the reviews for a Spot based on spotId
router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;
    const reviews = {};
    const findSpot = await Spot.findByPk(spotId);
    if (findSpot) {
        let getASpotReviews = await Review.findAll({
            where: {
                spotId: Number(spotId),
            },
            include: { model: ReviewImage, attributes: ['id', 'url'] },
        });
        if (getASpotReviews.length) {
            reviews.Reviews = getASpotReviews;
            return res.status(200).json(reviews);
        } else return res.status(200).json({ message: `${findSpot.name} doesn't have any reviews yet!` });
    } else {
        const err = new Error;
        err.status = 404;
        err.message = "Spot couldn't be found";
        res.status(err.status).json({ errorCode: err.status, message: err.message });
        next(err);
    };
});

// gets Spot by spotId
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
            group: ['id', 'spotId', 'userId', 'stars', 'review', 'updatedAt', 'createdAt'],
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
            group: ['id', 'spotId', 'userId', 'stars', 'review', 'updatedAt', 'createdAt'],
        });
        findSpotById.Owner = findOwner;
        findSpotById.numReviews = (ratingCount !== null)
            ? Number(ratingCount.dataValues.reviewCount) : 0;
        findSpotById.avgStarRating = (ratingTotal !== null)
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
router.get('/', handleValidationErrors, async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const spots = {};
    const spotArray = [];
    let spot;
    const err = new Error;
    err.message = 'Validation Error';
    err.status = 400;
    err.errors = [];

    if (page < 0) err.errors.push({ "page": "Page must be greater than or equal to 0" });
    if (size < 0) err.errors.push({ "size": "Size must be greater than or equal to 0" });


    if (!page) page = 0;
    if (!size) size = 20;
    if (size > 20) size = 20;

    if (isNaN(size) || typeof (size) === 'string') size = Number(size);
    if (isNaN(page) || typeof (page) === 'string') page = Number(page);

    let limit;
    let offset;
    if (page >= 1 && size >= 1 && size <= 20) {
        limit = size;
        offset = (page - 1) * size;
    };

    const where = {};

    if (minLat) {
        if (-90 > Number(minLat) || Number(minLat) > 90) err.errors.push({ "minLat": "Minimum latitude is invalid" });
        else where.lat = { [Op.gte]: Number(minLat) };
    };
    if (maxLat) {
        if (-90 > Number(maxLat) || Number(maxLat) > 90) err.errors.push({ "maxLat": "Maximum latitude is invalid" });
        else where.lat = { [Op.lte]: Number(maxLat) };
    };
    if (minLat && maxLat) {
        if (-90 > Number(maxLat) || Number(maxLat) > 90) err.errors.push({ "maxLat": "Maximum latitude is invalid" });
        if (-90 > Number(minLat) || Number(minLat) > 90) err.errors.push({ "minLat": "Minimum latitude is invalid" });
        where.lat = { [Op.between]: [Number(minLat), Number(maxLat)] };
    };

    if (minLng) {
        if (-180 > Number(minLng) || Number(minLng) > 180) err.errors.push({ "minLng": "Maximum longitude is invalid" });
        else where.lng = { [Op.gte]: Number(minLng) };
    };
    if (maxLng) {
        if (-180 > Number(maxLng) || Number(maxLng) > 180) err.errors.push({ "maxLng": "Minimum longitude is invalid" });
        else where.lng = { [Op.lte]: Number(maxLng) };
    };
    if (minLng && maxLng) {
        if (-180 > Number(maxLng) || Number(maxLng) > 180) err.errors.push({ "maxLng": "Minimum longitude is invalid" });
        if (-180 > Number(minLng) || Number(minLng) > 180) err.errors.push({ "minLng": "Maximum longitude is invalid" });
        else where.lng = { [Op.between]: [Number(minLng), Number(maxLng)] };
    };

    if (minPrice) {
        if (Number(minPrice) < 0) err.errors.push({ "minPrice": "Maximum price must be greater than or equal to 0" });
        else where.price = { [Op.gte]: Number(minPrice) };
    };
    if (maxPrice) {
        if (Number(maxPrice) < 0) err.errors.push({ "maxPrice": "Minimum price must be greater than or equal to 0" });
        else where.price = { [Op.lte]: Number(maxPrice) };
    };
    if (minPrice && maxPrice) {
        if (Number(minPrice) < 0) err.errors.push({ "minPrice": "Maximum price must be greater than or equal to 0" });
        if (Number(maxPrice) < 0) err.errors.push({ "maxPrice": "Minimum price must be greater than or equal to 0" });
        else where.price = { [Op.between]: [Number(minPrice), Number(maxPrice)] };
    }

    const allSpots = await Spot.findAll({
        where,
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
        limit,
        offset,
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
            group: ['id', 'spotId', 'userId', 'review', 'stars', 'updatedAt', 'createdAt'],
        });
        console.log(ratings)
        const previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.dataValues.id,
                preview: true,
            },
            group: ['id', 'spotId', 'preview', 'url', 'updatedAt', 'createdAt'],
        });
        spot = spot.toJSON();
        const ratingTotal = () => {
            let total = 0;
            for (let i = 0; i < ratings.length; i++) {
                const element = ratings[i];
                total += element.dataValues.stars;
            };
            return total;
        };
        spot.avgRating = (ratings.length)
            ? Number(ratingTotal() / ratings.length)
            : `${spot.name} doesn't have any reviews yet!`;
        spot.preview = (previewImage !== null)
            ? previewImage.url : `${spot.name} doesn't have a preview!`;
        spotArray.push(spot);
    };
    spots.page = page;
    spots.size = size;
    spots.Spots = spotArray;
    if (!err.errors.length) return res.status(200).json(spots);
    else {
        res.status(err.status).json({ errorCode: err.status, message: err.message, errors: err.errors });
        throw err;
    };
});


module.exports = router;
