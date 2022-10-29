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
   await queryInterface.bulkInsert('Spots', [
    {
      ownerId: 1,
      address: '12345 Somewhere in Arlen',
      city: 'Arlen',
      state: 'Texas',
      country: 'United States',
      lat: 32.705002,
      lng: -97.122780,
      name: 'The Hill Residence',
      description: 'Beautiful, spacious ranch-style 3 bedroom home with 2 bathrooms and a gorgeous lawn.',
      price: 100.00,
    },
    {
      ownerId: 2,
      address: '67891 Somewhere not around the Hill Residence',
      city: 'American Town',
      state: 'Texas',
      country: 'Japan',
      name: "Peggy's Secret Pad",
      description: "Shhhhhhh... Don't let Hank know...",
      price: 1000.00,
    },
    {
      ownerId: 1,
      address: '135 Los Gatos Road',
      city: 'Arlen',
      state: 'Texas',
      country: "'Merica",
      name: 'Strickland Propane',
      description: 'Here we sell propane and propane accessories.',
      price: 59.99,
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
