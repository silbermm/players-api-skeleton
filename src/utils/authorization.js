const database = require("../database");

const authorization = {
  handleAuth: (req, res, fn) => {
    try {
      const bearer = req.get("Authorization");
      [prefix, token] = bearer.split(" ");
      if (prefix !== "Bearer") throw new Error(403);
      const user = database.findUserByToken(token);
      fn(token, user.user.id);
    } catch (err) {
      res.status(403);
      res.send();
    }
  }
};

module.exports = authorization;
