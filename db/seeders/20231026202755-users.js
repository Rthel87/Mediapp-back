'use strict';
const bcrypt = require('bcrypt');
const { Role } = require('../models/index');

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

    let adminRol = await Role.findOne({where: {range: 1}});
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync('admin', salt);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@atixlab.com',
        password: hash,
        RoleId: adminRol.id,
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

     await queryInterface.bulkDelete('Users', {[Op.or]: [
       { email: 'admin@atixlab.com' }
     ]})
  }
};
