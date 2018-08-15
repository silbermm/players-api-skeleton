const database = require("../database");

module.exports = {
  Player: {
    create: async player => {
      let { first_name, last_name, rating, handedness, created_by } = player;
      if (!first_name || !last_name || !rating || !handedness) {
        throw Error(409);
      }
      const inserted = database.player.insert(player);
      if (!inserted) {
        throw Error(409);
      }
      return inserted;
    },
    findById: async playerId => {
      return database.player.findById(playerId);
    },
    getAll: async userId => {
      return database.player.findByCreator(userId);
    },
    remove: async () => {
      database.player.remove();
    },
    removePlayer: async (playerId, userId) => {
      if (!database.player.remove(playerId, userId)) {
        throw Error(404);
      }
    }
  },
  User: {
    create: async ({
      email,
      first_name,
      last_name,
      password,
      confirm_password
    }) => {
      if (
        !email ||
        password !== confirm_password ||
        !first_name ||
        !last_name
      ) {
        throw Error(409);
      }
      const userToInsert = { email, first_name, last_name, password };
      const inserted = database.user.insert(userToInsert);
      if (!inserted) {
        throw Error(409);
      }
      return inserted;
    },
    login: async ({ email, password }) => {
      const user = database.user.find(email, password);
      if (!user) {
        throw Error(401);
      }
      return user;
    },
    remove: async () => {
      database.user.remove();
      return true;
    },
    update: async (id, user) => {
      let newUser = database.user.update(id, user);
      if (!newUser) {
        throw Error(409);
      }
      return newUser;
    }
  }
};
