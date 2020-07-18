'use strict';
module.exports = (sequelize, DataTypes) => {
  const provider = sequelize.define('provider', {
    name: DataTypes.STRING
  }, {});
  provider.associate = function(models) {
    // associations can be defined here
      provider.hasMany(models.product, {
        foreignKey: 'providerId'
      })
  };
  return provider;
};