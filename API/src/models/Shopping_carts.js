const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Shopping_carts', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: false
  }).removeAttribute('id');
};