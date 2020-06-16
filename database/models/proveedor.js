'use strict';
module.exports = (sequelize, DataTypes) => {
  const proveedor = sequelize.define('proveedor', {
    name: DataTypes.STRING
  }, {});
  proveedor.associate = function(models) {
    // associations can be defined here
  };
  return proveedor;
};