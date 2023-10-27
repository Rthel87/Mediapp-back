const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../../db/models/index');

// Servicio que permite la autenticación de un usuario en el sistema
async function login(req, res) {
  let user = await User.findOne({where: {email: req.body.email}});
  /* if (!user) {
    res.status(422).json({error: 'Usuario no autorizado'});
  }
  if (!await bcrypt.compare(req.body.password, user.password)) {
    res.status(422).json({error: 'Contraseña errónea'});
  } else {
    let token = jwt.sign({userId: user.id}, process.env.SECRETWORD);
    res.status(200).json({jwt: token});
  }*/
  if (!!user && await bcrypt.compare(req.body.password, user.password)) {
    let token = jwt.sign({userId: user.id}, process.env.SECRETWORD);
    res.status(200).json({jwt: token});
  } else {
    res.status(422).json({error: 'Usuario no autorizado o contraseña errónea'});
  }
}

module.exports = {
  login
}
