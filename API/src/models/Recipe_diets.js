const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Recipe_diets', {
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    diet: {
      type: DataTypes.STRING
      /*
      ENUM(
        "gluten free",
        "dairy free",
        "lacto ovo vegetarian",
        "vegan",
        "vegetarian",
        "paleolithic",
        "primal",
        "whole 30",
        "pescatarian",
        "ketogenic",
        "fodmap friendly"
      )
      */,
      primaryKey: true
    }
  }, {
    timestamps: false
  }).removeAttribute('id');
};
