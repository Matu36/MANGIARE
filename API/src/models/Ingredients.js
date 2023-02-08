const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ingredients', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
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
  });
};
