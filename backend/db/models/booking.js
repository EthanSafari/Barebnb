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

      // defines the relationship between the User and the Spot Models and tables through the Bookings table and model
      Booking.belongsTo( models.User, { foreignKey: 'userId' } );
      Booking.belongsTo( models.Spot, { foreignKey: 'spotId' } );
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
        isAfter: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getUTCDate()}`,
        isBefore: this.endDate,
      },
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        isAfter: this.startDate,
      },
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
