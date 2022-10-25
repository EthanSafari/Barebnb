const express = require('express');

const router = express.Router();

const { Spot } = require('../../db/models');

const where = {};

router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll({
        where,
    });

    if (allSpots.length) return res.status(200).json(allSpots)
    else {
        const err = new Error;
        err.status = 500;
        err.message = 'Looks like all available spots are unavailable. Sorry for the inconvenience!';
        next(err);
    };
});

module.exports = router;
