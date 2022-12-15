'use strict';
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};
options.tableName = 'SpotImages';

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
      url: 'https://vignette3.wikia.nocookie.net/kingofthehill/images/a/a4/HILL.png/revision/latest?cb=20170706011030',
      preview: true,
    },
    {
      spotId: 4,
      url: 'https://i.pinimg.com/736x/ab/a9/8e/aba98e8177658aa1f0e430a3443a4bc4--spongebob-party-spongebob-squarepants.jpg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://th.bing.com/th/id/R.28bb83111dbd4929ffa5a8dcf8328aad?rik=CumSxQPlRa81DA&riu=http%3a%2f%2fasshawk.com%2fwp-content%2fuploads%2f2012%2f02%2fstrickland-propane.jpg&ehk=SgH1XJG2%2b9sOeTrwnDrqPRwDIzCmIa8Xwp9WpaZSnas%3d&risl=&pid=ImgRaw&r=0',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://preview.redd.it/04yrfa2dfwa51.png?width=960&format=png&auto=webp&s=0c69007f43519009949eb16e41994a234858b6a0',
      preview: true,
    },
    {
      spotId: 5,
      url: 'https://vignette.wikia.nocookie.net/parody/images/c/c4/Patrick_house.png/revision/latest?cb=20150906221950',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://cdn.vox-cdn.com/thumbor/r8Oa1TpNY6Otil7ZisAzKswy1J8=/0x0:1810x1130/1200x800/filters:focal(761x421:1049x709)/cdn.vox-cdn.com/uploads/chorus_image/image/58606021/the_krusty_krab_viacom.0.jpg',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://th.bing.com/th/id/R.8ff6bdd5d024ab1b1432056ba4e3bf4c?rik=7qKqHrailOaDog&riu=http%3a%2f%2fimg2.wikia.nocookie.net%2f__cb20140730061448%2fspongebob%2fimages%2f2%2f22%2fMr.Krabs%27_House.png&ehk=l%2bsbD%2bcfZpW6EDnZEfbGfyKuvsvFPBUQj7I9s5A0ZLk%3d&risl=&pid=ImgRaw&r=0',
      preview: true,
    },
    {
      spotId: 7,
      url: 'https://th.bing.com/th/id/R.01791e46df7597a5c1f67d5a6c1a4cab?rik=rLTAI4roxlEshg&riu=http%3a%2f%2fimg2.wikia.nocookie.net%2f__cb20150104201131%2fspongebob%2fimages%2ff%2ff5%2fSquidward%27s_House_in_Sponge_Out_of_Water.png&ehk=SHTlpykEtHzNXtF1ahKvBmyPsSJ%2bWA2BbT%2bCjIWAv0A%3d&risl=&pid=ImgRaw&r=0',
      preview: true,
    },
    {
      spotId: 9,
      url: 'https://th.bing.com/th/id/R.75bc0948a534530887a0bb26d806de6b?rik=3NHqdZ2APHIstw&riu=http%3a%2f%2fimg4.wikia.nocookie.net%2f__cb20130420220337%2fspongebob%2fimages%2ff%2ffe%2f180px-Krusty_Krab_2.jpg&ehk=foM3fY1OVXxsl386T%2f4UhWDuCqGNE3%2fnnG%2fTi%2bj5bHQ%3d&risl=&pid=ImgRaw&r=0',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://cdnb.artstation.com/p/assets/images/images/029/104/549/large/nati-dias-sandy-house-3-nati.jpg?1596473772',
      preview: true,
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
