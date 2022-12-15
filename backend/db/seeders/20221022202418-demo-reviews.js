'use strict';
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};
options.tableName = 'Reviews';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 3,
      review: "I don't know you! That's my purse!",
      stars: 5,
    },
    {
      spotId: 3,
      userId: 2,
      review: "Hank loves this place, he's the greatest propane salesman that I know!",
      stars: 4,
    },
    {
      spotId: 2,
      userId: 1,
      review: "The evolution of this house amazes me. You can be part of it too.",
      stars: 5,
    },
    {
      spotId: 4,
      userId: 8,
      review: 'Please stay at this place... Anything to get that annoying sponge out of here.',
      stars: 5,
    },
    {
      spotId: 4,
      userId: 1,
      review: "Pineapple goes great on the grill with some chicken as long as you're using propane.",
      stars: 4,
    },
    {
      spotId: 1,
      userId: 2,
      review: "Amazing home to stay at. Known the owner Hank about most my life. Great guy, great home.",
      stars: 5,
    },
    {
      spotId: 5,
      userId: 5,
      review: "It's not just a boulder, It's a rock... It's a big, beautiful, old rock 🥲",
      stars: 5,
    },
    {
      spotId: 6,
      userId: 6,
      review: 'May I take your hat sir?',
      stars: 5,
    },
    {
      spotId: 6,
      userId: 8,
      review: "Please stay away from here... we don't want your business",
      stars: 1,
    },
    {
      spotId: 7,
      userId: 6,
      review: 'Is mayonnaise an instrument?',
      stars: 3,
    },
    {
      spotId: 7,
      userId: 10,
      review: 'According to an online forum from 2011, my crush lives here? With that said, 5/5 great place!',
      stars: 5,
    },
    {
      spotId: 8,
      userId: 5,
      review: 'Did the paint on this place. Absolutely gorgeous interior.',
      stars: 5,
    },
    {
      spotId: 8,
      userId: 6,
      review: 'This guy created Krabby Patties. His root beer has a similar style.',
      stars: 4,
    },
    {
      spotId: 2,
      userId: 10,
      review: 'This guy seems very down on his luck. Nice house though...',
      stars: 4,
    },
    {
      spotId: 2,
      userId: 9,
      review: 'Clinical depression for sure. His house follows the same.',
      stars: 2,
    },
    {
      spotId: 9,
      userId: 6,
      review: 'Mmmm... Krabby Patties 😋',
      stars: 5,
    },
    {
      spotId: 9,
      userId: 5,
      review: 'Come get your Krabby Patties Here!',
      stars: 5,
    },
    {
      spotId: 10,
      userId: 5,
      review: "I don't need it... 💧",
      stars: 2,
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, null, {});
  }
};
