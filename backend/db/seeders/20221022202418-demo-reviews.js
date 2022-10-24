'use strict';
const { Op } = require('sequelize');

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
   await queryInterface.bulkInsert('Reviews', [
    {
      spotId: 1,
      userId: 3,
      review: "I don't know you! That's my purse!",
      stars: 5,
    },
    {
      spotId: 3,
      userId: 2,
      review: "Hank loves this place, he never wants to come home!",
      stars: 4,
    },
    {
      spotId: 2,
      userId: 1,
      review: "PEGGY DID HWAAAAAATTTTTTTT!!!!!",
      stars: 1,
    },
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', {
      review: {
        [Op.in]: [
          "I don't know you! That's my purse!",
          "Hank loves this place, he never wants to come home!",
          "PEGGY DID HWAAAAAATTTTTTTT!!!!!",
        ],
      },
    });
  }
};
