'use strict';
const {
  Model, validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(username) {
          if (validator.isEmail(username)) throw new Error('Cannot be an email.');
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      validate: {
        len: [60, 60],
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

// isNotEmail(username) { // checks to see if the username entered is not an email
//   if (username.includes('@') && username.toLowerCase().includes('.com'))
//     throw new Error('Username must not be an email!');
// },
// above is the original custom validator I wrote to find email format
