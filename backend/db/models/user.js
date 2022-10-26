'use strict';
const bcrypt = require('bcryptjs');
const {
  Model, Validator
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
    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        firstName,
        lastName,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      // define association here

      // defines the association between the User model and the Spot model, where the User:Owner can have many Spots
      User.hasMany( models.Spot, { foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true } );
      // defines the association between the User model and the Spot model, with a many-to-many relationship through the Booking model
      // User.belongsToMany( models.Spot, { through: models.Booking } );
      User.belongsToMany( models.Spot, { through: 'Booking', otherKey: 'spotId', foreignKey: 'userId' } );
      User.hasMany( models.Booking, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true } );
      // defines the association between the User model and the Spot model, with a many-to-many relationship through the Review model
      // User.belongsToMany( models.Spot, { through: models.Review } );
      User.belongsToMany( models.Spot, { through: 'Review', otherKey: 'spotId', foreignKey: 'userId' } );
      User.hasMany( models.Review, { foreignKey: 'userId' } );
      // may need onDelete CASCADE later
      // don't want to affect avg review rating
    };
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) { // checks to see if the username entered is not an email
          if (Validator.isEmail(value))
            throw new Error('Cannot be an email.');
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
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
