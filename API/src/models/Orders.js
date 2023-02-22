const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Orders', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preferenceId: {
      type: DataTypes.STRING,
    },
    merchant_orderId: {
      type: DataTypes.STRING,
    },
    tsPayment: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    status: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    updatedAt: false
  });
};