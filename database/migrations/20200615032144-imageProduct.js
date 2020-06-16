'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('imageProduct', { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        isFirst: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
        imageId: {
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'images',
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

      return queryInterface.dropTable('imageProduct');
    
  }
};
