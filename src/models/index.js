const database = require("../database");

module.exports = {
  Player: {
    remove: async () => {
      database.removePlayers();
    },
    removePlayer: async (playerId, userId) => {
      if (!database.removePlayer(playerId, userId)) {
        throw Error(404)
      }
    },
    create: async ({
      first_name,
      last_name,
      rating,
      handedness,
      created_by
    }) => {
      if (!first_name || !last_name || !rating || !handedness) {
        throw Error(409);
      }
      const newPlayer = database.insertPlayer({
        first_name,
        last_name,
        rating,
        handedness,
        created_by
      });
      if (newPlayer) {
        return newPlayer;
      }
      throw Error(409);
    },
    getAll: async (userId) => {
      return database.getPlayers(userId)
    },
    findById: async (playerId) => {
      return database.findPlayerById(playerId);
    }
  },
  User: {
    remove: async () => {
      database.removeUsers();
      return true;
    },
    login: async ({ email, password }) => {
      const user = database.findUser(email, password);
      if (!user) {
        throw Error(401);
      }
      return user;
    },
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
      const userToInsert = {email, first_name, last_name, password}
      const inserted = database.insertUser(userToInsert);
      if (!inserted) {
        throw Error(409);
      }
      return inserted;
    },
    update: async (id, user) => {
      let newUser = database.updateUser(id, user);
      if (!newUser) {
        throw Error(409);
      }
      return newUser;
    }
  }
};
