'use strict';
const bcrypt = require('bcryptjs');
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

    //makes sure everything is okay with the given info, and breaks it down to be used in the next functions
    toSafeObject() {
      const { id, username, email } = this;
      return { id, username, email };
    };

    //evaluates true/false based on the password that is stored, and the one that's given
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    //finds the currentUser by the :id, and displays their information
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    };

    //used to evaluate if the currentUser that is attempting to login is true to whats in the db
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: { //if either of these are true:
            username: credential,
            email: credential
          }
        }
      }); //the given password will be validated, and if that is true, the user will be given the correct credentials based on id
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };

    //creates a new instance of the User class by appending the username, the email, and a hashed version of the password
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      // define association here
    };
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
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  return User;
};

// isNotEmail(username) { // checks to see if the username entered is not an email
//   if (username.includes('@') && username.toLowerCase().includes('.com'))
//     throw new Error('Username must not be an email!');
// },
// above is the original custom validator I wrote to find email format
