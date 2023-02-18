const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Orders', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tsPayment: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    updatedAt: false
  });
};
