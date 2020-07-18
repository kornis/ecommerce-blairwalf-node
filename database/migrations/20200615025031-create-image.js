'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      productId: {
        type: Sequelize.BIGINT,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'products'
          },
          key: 'id'
        },
        allowNull: false
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
    return queryInterface.dropTable('images');
  }
};