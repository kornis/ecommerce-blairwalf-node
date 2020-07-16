'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('brandProvider', { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        providerId: {
          type: Sequelize.BIGINT,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: {
              tableName: 'providers',
            },
            key: 'id'
          },
          allowNull: false
        },
        brandId: {
          type: Sequelize.BIGINT,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: {
              tableName: 'brands',
            },
            key: 'id'
          },
          allowNull: false
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('brandProvider');

  }
};
