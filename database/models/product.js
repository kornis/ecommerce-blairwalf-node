'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    title: DataTypes.STRING
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};