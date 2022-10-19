'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    startDate: {
      type: DataTypes.DATE,
      validate: {
        checkDate(date) {
          let current = new Date();
          if (date < current)
            throw new Error(`Date entered must be a future date`);
        },
      },
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        checkDate(date) {
          let current = new Date();
          if (date < current)
            throw new Error(`Date entered must be a future date`);
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
