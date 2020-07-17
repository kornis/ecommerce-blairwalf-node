'use strict';
module.exports = (sequelize, DataTypes) => {
  const brand = sequelize.define('brand', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {});
  brand.associate = function(models) {
    // associations can be defined here
  };
  return brand;
};