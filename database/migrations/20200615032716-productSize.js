'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('productSize', { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        productId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: {
              tableName: 'products',
            },
            key: 'id'
          },
          allowNull: false
        },
        sizeId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: {
              tableName: 'sizes',
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

      return queryInterface.dropTable('productSize');

  }
};
