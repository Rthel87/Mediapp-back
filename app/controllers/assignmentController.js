const { Patient, User, Role, Professional } = require('../../db/models/index');
const bcrypt = require('bcrypt');

// Servicio que permite crear y/o actualizar un paciente junto con la asignación de un profesional
async function create(req, res) {
  console.log(req.body.patient);
  console.log(req.body.professional);
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
  res.status(201).json(patient)
}


module.exports = {
  create
}
