const { User, Role } = require('../../db/models/index');

// Servicio que entrega la información del usuario autenticado
async function user(req, res) {
  const user = await User.findByPk(req.user.userId, {
    include: {
      model: Role.scope('jsonData'),
      required: true,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'password']
    }
  });
  res.status(200).json(user);
}

module.exports = {
  user
}
