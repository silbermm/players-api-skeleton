module.exports = {
  user: {
    insert: u => {
      let user = users.find(user => user.user.email === u.email);
      if (user) {
        return null;
      } else {
        const newUser = {
          user: { ...u, id: (users.length + 1).toString() },
          token: u.email
        };
        users = [...users, newUser];
        return newUser;
      }
    },
    find: (email, password) => {
      let user = users.find(
        u => u.user.email === email && u.user.password === password
      );
      if (user) {
        return user;
      }
      return null;
    },
    findByToken: token => {
      return users.find(u => u.token === token);
    },
    remove: () => {
      users = [];
    },
    update: (id, newUser) => {
      const user = users.find(u => u.user.id === id);
      const updated = { ...newUser, id: user.user.id }
      if (user) {
        users = users.map(u => {
          if (u.user.id === id) {
            return { ...u, user: updated };
          }
        });
        return { user: updated, token: user.token };
      }
      return null;
    }
  },
  player: {
    findByCreator: userId => {
      return players.filter(p => p.created_by === userId);
    },
    findById: playerId => {
      return players.find(player => player.id === playerId);
    },
    insert: (player) => {
      let { first_name, last_name, rating, handedness, created_by } = player;
      if (players.find( player => player.first_name === first_name && player.last_name === last_name)) return null;
      const newPlayer = { ...player, id: (players.length + 1).toString() };
      players = [...players, newPlayer];
      return newPlayer;
    },
    remove: (playerId, userId) => {
      if (!playerId) {
        players = [];
        return true;
      } else {
        const player = players.find(
          player => player.id === playerId && player.created_by === userId
        );
        if (player) {
          players = players.filter(player => player.id !== playerId);
          return true;
        }
        return false;
      }
    }
  }
};

let users = [];
let players = [];
