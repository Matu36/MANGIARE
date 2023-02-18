const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Order_details', {
    orderId: {
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
    },  
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    timestamps: false
  }).removeAttribute('id');
};
