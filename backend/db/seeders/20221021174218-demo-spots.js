'use strict';
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};
options.tableName = 'Spots';

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
    { //1
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
    { //2
      ownerId: 2,
      address: '67891 Somewhere in Arlen',
      city: 'Arlen',
      state: 'Texas',
      country: 'United States',
      lat: 32.705002,
      lng: -97.122780,
      name: "The Dauterive Residence",
      description: "This house has evolved through the years. It's been a homeless shelter before, it can be your homeless shelter when you visit the area.",
      price: 20.00,
    },
    { //3
      ownerId: 1,
      address: '135 Los Gatos Road',
      city: 'Arlen',
      state: 'Texas',
      country: "'Merica",
      lat: 32.705002,
      lng: -97.122780,
      name: 'Strickland Propane',
      description: 'Here we sell propane and propane accessories.',
      price: 60.00,
    },
    { //4
      ownerId: 5,
      address: '124 Conch Street',
      city: 'Bikini Bottom',
      state: 'Marshall Islands',
      country: 'Pacific Ocean',
      name: 'Undersea Pineapple',
      description: 'Immerse yourself in gorgeous Bikini Bottom, located close to the famous Goo Lagoon and establishments such as the Krusty Krab!',
      price: 50.00,
    },
    { //5
      ownerId: 6,
      address: '120 Conch Street',
      city: 'Bikini Bottom',
      state: 'Marshall Islands',
      country: 'Pacific Ocean',
      name:  'The Rock',
      description: 'My beautiful rock protects me from harm. It will for you too.',
      price: 40.00,
    },
    { //6
      ownerId: 7,
      address: '831 Bottomfeeder Lane',
      city: 'Bikini Bottom',
      state: 'Marshall Islands',
      country: 'Pacific Ocean',
      name: 'Krusty Krab',
      description: 'FOR A LIMITED TIME ONLY: PRETTY PATTIES! 🌈🍔',
      price: 20.00,
    },
    { //7
      ownerId: 8,
      address: '122 Conch Street',
      city: 'Bikini Bottom',
      state: 'Marshall Islands',
      country: 'Pacific Ocean',
      name: 'Moai',
      description: 'Come experience how a true musical genius lives. 🎶🧠',
      price: 120.00,
    },
    { //8
      ownerId: 7,
      address: '3451 Anchor Way',
      city: 'Bikini Bottom',
      state: 'Marshall Islands',
      country: 'Pacific Ocean',
      name: 'Sweet Anchor Home',
      description: 'Sit back and relax with a root beer from the root beer cellar... Only 5$ each. 🍻',
      price: 550.00,
    },
    { //9
      ownerId: 7,
      address: '833 Bottomfeeder Lane',
      city: 'Bikini Bottom',
      state: 'Marshall Islands',
      country: 'Pacific Ocean',
      name: 'Krusty Krab 2',
      description: 'Money 💸',
      price: 30.00,
    },
    { //10
      ownerId: 10,
      address: '12345 Somewhere in Bikini Bottom',
      city: 'Bikini Bottom',
      state: 'Marshall Islands',
      country: 'Pacific Ocean',
      name: "Sandy's Treedome",
      description: 'Only place in Bikini Bottom where breathable Oxygen is present',
      price: 100.00,
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
    await queryInterface.bulkDelete(options, null, {});
  }
};
