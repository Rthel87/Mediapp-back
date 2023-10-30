'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PatientsProfessionals', {
      PatientId: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'Patients'
          },
          key: 'id'
        }
      },
      ProfessionalId: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'Professionals'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PatientsProfessionals');
  }
};
