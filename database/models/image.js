'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    } 
  }, {});
  image.associate = function(models) {
    // associations can be defined here
    image.belongsTo(models.product, {
      foreignKey: 'productId'
    })
  };
  return image;
};