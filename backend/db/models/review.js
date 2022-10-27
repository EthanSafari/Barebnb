'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Defines the relationship betweeen the User and the Spot models and Tables through their respective foreign keys
      Review.belongsTo( models.User, { foreignKey: 'userId' } );
      Review.belongsTo( models.Spot, { foreignKey: 'spotId' } );
      // Defines the relationship between the ReviewImage model and the Review model in a one-to-many relationship
      Review.hasMany( models.reviewImage, { foreignKey: 'reviewId', onDelete: 'CASCADE' } );
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING(500),
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
  }, {
    sequelize,
    modelName: 'review',
  });
  return Review;
};
