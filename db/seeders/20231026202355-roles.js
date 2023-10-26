'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Roles', [
      {
        role: 'Administrador',
        range: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'Paciente',
        range: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     let Op = Sequelize.Op;

     await queryInterface.bulkDelete('Roles', {
       range: {[Op.between]: [1, 2]}
     })
  }
};
