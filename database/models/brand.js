'use strict';
module.exports = (sequelize, DataTypes) => {
  const brand = sequelize.define('brand', {
    name: DataTypes.STRING
  }, {});
  brand.associate = function(models) {
    // associations can be defined here
  };
  return brand;
};