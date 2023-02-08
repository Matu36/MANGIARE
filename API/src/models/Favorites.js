const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Favorites', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    timestamps: false
  }).removeAttribute('id');
};
