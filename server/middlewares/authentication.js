const { User } = require("../models/");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }
    const [type, token] = access_token.split(" ");
    if (type !== "Bearer") {
      throw { name: "Unauthenticated" };
    }
    const verify = verifyToken(token);
    const user = await User.findByPk(verify.id);
    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.user = { id: user.id };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
