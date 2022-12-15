'use strict';
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

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
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      { //1
        firstName: 'Hank',
        lastName: 'Hill',
        email: 'ibringthepane@propane.com',
        username: 'PropaneSalesman',
        hashedPassword: bcrypt.hashSync('propane'),

      },
      { //2
        firstName: 'Bill',
        lastName: 'Dauterive',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
      },
      { //3
        firstName: 'Bobby',
        lastName: 'Hill',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
      },
      { //4
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      { //5
        firstName: 'SpongeBob',
        lastName: 'Squarepants',
        email: 'bestfrycook@krustykrab.com',
        username: 'KrabbyPattyCook1',
        hashedPassword: bcrypt.hashSync('GaryIsTheBest'),
      },
      { //6
        firstName: 'Patrick',
        lastName: 'Star',
        email: 'patrickstar@bikinibottom.com',
        username: 'PatrickStar',
        hashedPassword: bcrypt.hashSync('bikinibottomstar'),
      },
      { //7
        firstName: 'Eugine',
        lastName: 'Krabs',
        email: 'money@krustykrab.com',
        username: '$KMoney$',
        hashedPassword: bcrypt.hashSync('ILoveMoney'),
      },
      { //8
        firstName: 'Squidward',
        lastName: 'Tentacles',
        email: 'musicaltalent@krustykrab.com',
        username: 'MuscialGod',
        hashedPassword: bcrypt.hashSync('clarinet'),
      },
      { //9
        firstName: 'Gregory',
        lastName: 'House',
        email: 'ruthlessdoctor@hospital.com',
        username: 'DoctorHouse',
        hashedPassword: bcrypt.hashSync('IAmDoctorHouse'),
      },
      { //10
        firstName: 'Sandy',
        lastName: 'Cheeks',
        email: 'onetruesquirrel@squirrel.com',
        username: 'SandyCheeks',
        hashedPassword: bcrypt.hashSync('sandycheeks'),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options, null, {});
  },
};
