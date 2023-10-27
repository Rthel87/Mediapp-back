const { Professional } = require('../../db/models/index');

// Servicio que entrega el listado de profesionales ingresado en el sistema
async function index(req, res) {
  const proffesionals = await Professional.scope('jsonData').findAll();
  res.status(200).json(proffesionals);
}

// Servicio que permite agregar un profesional al sistema
async function create(req, res) {
  let professional = Professional.build({
    name: req.body.professional.name,
    speciality: req.body.professional.speciality,
    level: req.body.professional.level
  });
  try {
    await professional.save();
    res.status(201).json(professional);
  } catch (e) {
    res.status(422).json({error: 'No fue posible agregar el nuevo profesional'});
  }
}

// Servicio que permite obtener la información de un profesional
async function show(req, res) {
  let professional = await Professional.scope('jsonData').findByPk(req.params.id);
  if (!!professional) {
    res.status(200).json(professional);
  } else {
    res.status(422).json(
      {error: 'No se ha encontrado el profesional con  id ' + req.params.id}
    );
  }
}


// Servicio que permite actualizar la información de un profesional
async function upgrade(req, res) {
  let professional = await Professional.findByPk(req.params.id);
  if (!!professional) {
    professional.name = req.body.professional.name;
    professional.speciality = req.body.professional.speciality;
    professional.level = req.body.professional.level;
    await professional.save();
    res.status(201).json(professional);
  } else {
    res.status(422).json({error: 'No fue posible actualizar el profesional'});
  }
}

// Servicio que permite eliminar un profesional del sistema
async function destroy(req, res) {
  let professional = await Professional.scope('jsonData').findByPk(req.params.id);
  if (!!professional) {
    await professional.removePatients();
    await professional.destroy();
    res.status(200).json(professional);
  } else {
    res.status(422).json({error: 'No existe el profesional requerido'});
  }
}

module.exports = {
  index,
  create,
  show,
  upgrade,
  destroy
}
