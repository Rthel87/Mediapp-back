const { Patient, User, Role, Professional } = require('../../db/models/index');
const bcrypt = require('bcrypt');

// Servicio que entrega el listado de asignaciones de pacientes por profesional
async function index(req, res) {
  const professionals = await Professional.scope('jsonData').findAll({
    include: {
      model: Patient,
      through: {
        attributes: ['createdAt']
      },
      include: {
        model: User.scope('userData'),
        required: true
      }
    }
  });
  res.status(200).json(professionals);
}

// Servicio que permite crear y/o actualizar un paciente junto con la asignación de un profesional
async function create(req, res) {
  const professional = await Professional.findByPk(req.body.professional.id);
  const hash = bcrypt.hashSync(req.body.patient.password, 10);
  let patient = await Patient.findOne({
    include: {
      model: User,
      required: true,
      where: {
        email: req.body.patient.email
      }
    }
  });
  if (!!patient) {
    let user = await patient.getUser();
    patient.city = req.body.patient.city;
    user.name = req.body.patient.name;
    user.password = hash;
    await user.save();
    await patient.save();
  } else {
    const role = await Role.findOne({where: {range: 2}});
    const user = await User.create({
      name: req.body.patient.name,
      email: req.body.patient.email,
      password: hash,
      RoleId: role.id
    });
    patient = await Patient.create({
      city: req.body.patient.city,
      UserId: user.id
    });
  }
  await patient.addProfessionals(professional);
  res.status(201).json(patient);
}

// Servicio que entrega los profesionales asignados a un paciente identificado por su 'id' de usuario
async function show(req, res) {
  const patient = await User.scope('userData').findByPk(req.params.id, {
    include: {
      model: Patient.scope('jsonData'),
      required: true,
      include: {
        model: Professional.scope('jsonData'),
        through: {
          attributes: ['createdAt']
        }
      }
    }
  });
  res.status(200).json(patient);
}

module.exports = {
  index,
  create,
  show
}
