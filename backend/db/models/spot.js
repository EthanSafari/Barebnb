'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // defines the relationship between spots and users through the booking join table
      Spot.belongsToMany( models.User, { through: models.Booking } );
      Spot.hasMany( models.Booking, { foreignKey: 'spotId', onDelete: 'CASCADE'} );
      // defines the relationship between spots and users from the perspective of an owner
      Spot.belongsTo( models.User, { foreignKey: 'ownerId' } );
      // defines the relationship between spots and users in the form of a review
      Spot.belongsToMany( models.User, { through: models.Review } );
      Spot.hasMany( models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE' } );
      // defines the relationship between a spot and its images
      Spot.belongsTo( models.SpotImage, { foreignKey: 'spotId'} );
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -90,
        max: 90,
      },
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -180,
        max: 180,
      },
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING(500),
    price: {
      type: DataTypes.DECIMAL,
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
