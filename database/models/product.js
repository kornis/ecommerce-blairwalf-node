'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tablaTalles: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  product.associate = function(models) {
    // associations can be defined here
    product.belongsTo(models.brand, {
      foreignKey: 'brandId',
    })

    product.belongsTo(models.category, {
      foreignKey: 'categoryId'
    })

    product.belongsTo(models.provider, {
      foreignKey: 'providerId'
    })

    product.hasMany(models.image, {
      foreignKey: 'productId'
    })
  };
  return product;
};