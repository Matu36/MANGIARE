const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Reviews', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    rate: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    updatedAt: false
  }).removeAttribute('id');
};
