'use strict';
module.exports = (sequelize, DataTypes) => {
  const size = sequelize.define('size', {
    name: DataTypes.STRING
  }, {});
  size.associate = function(models) {
      // associations can be defined here
      size.hasMany(models.product, {
        foreignKey: 'sizeId'
      })
  };
  return size;
};