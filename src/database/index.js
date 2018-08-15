module.exports = {
  insertUser: u => {
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
  removeUsers: () => {
    users = [];
  },
  findUser: (email, password) => {
    let user = users.find(
      u => u.user.email === email && u.user.password === password
    );
    if (user) {
      return user;
    }
    return null;
  },
  findUserByToken: token => {
    return users.find(u => u.token === token);
  },
  updateUser: (id, newUser) => {
    let user = users.find(u => u.user.id === id);
    if (user) {
      users = users.map(u => {
        if (u.user.id === id) {
          return { ...u, user: { ...newUser, id: u.user.id } };
        }
      });
      return users.find(u => u.user.id === id);
    }
    return null;
  },
  removePlayers: () => {
    players = [];
  },
  removePlayer: (playerId, userId) => {
    const player = players.find(
      player => player.id === playerId && player.created_by === userId
    );
    if (player) {
      players = players.filter(player => player.id !== playerId);
      return true;
    }
    return false;
  },
  getPlayers: userId => {
    return players.filter(p => p.created_by === userId);
  },
  findPlayerById: playerId => {
    return players.find(player => player.id === playerId);
  },
  insertPlayer: ({ first_name, last_name, rating, handedness, created_by }) => {
    let player = players.find(
      player =>
        player.first_name === first_name && player.last_name === last_name
    );
    if (player) return null;
    const newPlayer = {
      first_name,
      last_name,
      rating,
      handedness,
      created_by,
      id: (players.length + 1).toString()
    };
    players = [...players, newPlayer];
    return newPlayer;
  }
};

let users = [];
let players = [];
