'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientsProfessionals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PatientsProfessionals.init({
    PatientId: DataTypes.BIGINT,
    ProfessionalId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'PatientsProfessionals',
  });
  return PatientsProfessionals;
};
