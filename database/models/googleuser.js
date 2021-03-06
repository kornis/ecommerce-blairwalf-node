'use strict';
module.exports = (sequelize, DataTypes) => {
  const GoogleUser = sequelize.define('GoogleUser', {
    googleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true, 
    } ,
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dni: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    }, 
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    province: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt:{
      type: DataTypes.DATE,
      allowNull: true, 
    } 
  }, {});
  GoogleUser.associate = function(models) {
    // associations can be defined here
  };
  return GoogleUser;
};