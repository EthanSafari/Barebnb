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

      Review.belongsTo( models.ReviewImage, { foreignKey: 'reviewId' } );
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
    review: DataTypes.STRING,
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
