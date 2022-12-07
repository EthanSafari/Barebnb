'use strict';
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};
options.tableName = 'ReviewImages';

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
      reviewId: 1,
      url: 'https://gamefaqs.gamespot.com/a/screen/full/0/7/4/396074.jpg',
    },
    {
      reviewId: 2,
      url: 'https://static.wikia.nocookie.net/kingofthehill/images/3/31/That%27s_What_She_Said_5.jpg/revision/latest/scale-to-width-down/1000?cb=20160203091358',
    },
    {
      reviewId: 2,
      url: 'https://static.wikia.nocookie.net/kingofthehill/images/a/a5/Strick_Prop._Season_13.png/revision/latest/scale-to-width-down/1000?cb=20180213051003',
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
