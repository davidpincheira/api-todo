const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("token");

  //console.log(token)

  if (!token) return res.status(401).json({ message: "Error de autenticacion" });

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Token Invalido" });
  }
};