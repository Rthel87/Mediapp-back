'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PatientsProfessionals', {
      patientId: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'Patients'
          },
          key: 'id'
        }
      },
      professionalId: {
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
