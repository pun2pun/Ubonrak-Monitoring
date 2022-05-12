'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Electricals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      meterNumber: {
        type: Sequelize.INTEGER
      },
      room: {
        type: Sequelize.STRING
      },
      voltage: {
        type: Sequelize.FLOAT
      },
      current: {
        type: Sequelize.FLOAT
      },
      power: {
        type: Sequelize.FLOAT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Electricals');
  }
};