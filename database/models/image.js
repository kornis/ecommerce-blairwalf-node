'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    path: DataTypes.STRING
  }, {});
  image.associate = function(models) {
    // associations can be defined here
  };
  return image;
};