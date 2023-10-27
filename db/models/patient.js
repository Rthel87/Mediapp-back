'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsTo(models.User),
      Patient.belongsToMany(models.Professional, { through: 'PatientsProfessionals'})
    }
  }
  Patient.init({
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
    scopes: {
      jsonData: {
        attributes: {excludes: ['createdAt', 'updatedAt']}
      }
    }
  });
  return Patient;
};
