'use strict';
module.exports = (sequelize, DataTypes) => {
  const myShopping = sequelize.define('myShopping', {
    quantity: DataTypes.INTEGER
  }, {});
  myShopping.associate = function(models) {
    // associations can be defined here
  };
  return myShopping;
};