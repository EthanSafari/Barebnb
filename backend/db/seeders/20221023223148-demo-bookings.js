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
   await queryInterface.bulkInsert('Bookings', [
    {
      userId: 3,
      spotId: 1,
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-02-02'),
    },
    {
      userId: 3,
      spotId: 3,
      startDate: new Date('2023-03-03'),
      endDate: new Date('2023-04-04'),
    },
    {
      userId: 1,
      spotId: 2,
      startDate: new Date('2023-05-05'),
      endDate: new Date('2023-06-06'),
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
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};
