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

      // Spot.belongsToMany( models.User, { through: models.Booking } );

      Spot.belongsToMany( models.User, { through: 'Booking', otherKey: 'userId', foreignKey: 'spotId' } );
      Spot.hasMany( models.Booking, { foreignKey: 'spotId', onDelete: 'CASCADE'} );
      // defines the relationship between spots and users from the perspective of an owner
      Spot.belongsTo( models.User, { foreignKey: 'ownerId' } );
      // defines the relationship between spots and users in the form of a review

      // Spot.belongsToMany( models.User, { through: models.Review } );

      Spot.belongsToMany( models.User, { through: 'Review', otherKey: 'userId', foreignKey: 'spotId' } );
      Spot.hasMany( models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE' } );
      // defines the relationship between a spot and its images
      Spot.hasMany( models.SpotImage, { foreignKey: 'spotId', onDelete: 'CASCADE' } );
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
