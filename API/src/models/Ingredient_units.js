const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ingredient_units', {
    ingredientId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    unit: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    timestamps: false
  }).removeAttribute('id');
};
