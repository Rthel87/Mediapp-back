const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let authHeader = req.header('Authorization');
  if (!!authHeader) {
    let token = authHeader.split(' ')[1];
    try {
      const verification = jwt.verify(token, process.env.SECRETWORD);
      req.user = verification;
      next();
    } catch {
      res.status(400).json({error: 'El token no es válido'})
    }
  } else {
    res.status(401).json({message: 'Por favor, ingresa a la aplicación'})
  }
}

module.exports = verifyToken
