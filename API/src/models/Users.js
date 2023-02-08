const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Users', {
    username: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        isLowercase: true
      },
      set(value) {
        this.setDataValue('username', value.toLowerCase());
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true
      },
    },
    role: { // null: basic user ; false: admin user ; true: super admin user
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    active: { // null: not email verified ; false: banned/disabled ; true: active
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    premiumExpires: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    }
  }, {
    updatedAt: false
  });
};
