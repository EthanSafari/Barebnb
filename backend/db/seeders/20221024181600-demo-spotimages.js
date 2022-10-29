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
   await queryInterface.bulkInsert('SpotImages', [
    {
      spotId: 1,
      url: 'https://vignette3.wikia.nocookie.net/kingofthehill/images/a/a4/HILL.png/revision/latest?cb=20170706011030',
      preview: true,
    },
    {
      spotId: 1,
      url: 'https://storage.planner5d.com/s/2f6ae95e21581f847bc6d2ca314ee9c2_10.jpg?v=1427463915.jpg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://th.bing.com/th/id/R.28bb83111dbd4929ffa5a8dcf8328aad?rik=CumSxQPlRa81DA&riu=http%3a%2f%2fasshawk.com%2fwp-content%2fuploads%2f2012%2f02%2fstrickland-propane.jpg&ehk=SgH1XJG2%2b9sOeTrwnDrqPRwDIzCmIa8Xwp9WpaZSnas%3d&risl=&pid=ImgRaw&r=0',
      preview: false,
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
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
