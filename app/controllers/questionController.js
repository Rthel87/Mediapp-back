const { Question } = require('../../db/models/index');

// Servicio que entrega las preguntas existentes en el sistema
async function index(req, res) {
  const questions = await Question.scope('jsonData').findAll();
  res.status(200).json(questions);
}

// Servicio que permite crear una nueva pregunta
async function create(req, res) {
  let question = Question.build({
    question: req.body.questionSet.question,
    answerOne: req.body.questionSet.answerOne,
    answerTwo: req.body.questionSet.answerTwo,
    answerThree: req.body.questionSet.answerThree
  });
  try {
    await question.save();
    res.status(201).json(question);
  } catch {
    res.status(422).json({error: 'No fue posible agregar la nueva pregunta'});
  }
}

// Servicio que entrega una pregunta en el sistema
async function show(req, res) {
  const question = await Question.scope('jsonData').findByPk(req.params.id);
  if (!!question) {
    res.status(200).json(question);
  } else {
    res.status(422).json({error: 'No existe la pregunta con id ' + req.params.id});
  }
}

// Servicio que permite actualizar una pregunta
async function update(req, res) {
  let question = await Question.scope('jsonData').findByPk(req.params.id);
  if (!!question) {
    question.question = req.body.questionSet.question;
    question.answerOne = req.body.questionSet.answerOne;
    question.answerTwo = req.body.questionSet.answerTwo;
    question.answerThree = req.body.questionSet.answerThree;
    await question.save();
    res.status(200).json(question);
  } else {
    res.status(422).json({error: 'No existe la pregunta con id ' + req.params.id});
  }
}

// Servicio que permite eliminar una pregunta
async function destroy(req, res) {
  let question = await Question.scope('jsonData').findByPk(req.params.id);
  if (!!question) {
    await question.destroy();
    res.status(200).json(question);
  } else {
    res.status(422).json({error: 'No se ha encontrado la pregunta con id ' + req.params.id});
  }
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy
}
