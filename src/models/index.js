const  u = { user: { id: "1", email: 'jim@bob.com', password: 'foobar123' }, token: "this is a token" }

const database = require('../database');

module.exports = {
  Player: {
    remove: function() {
      return true;
    }
  },
  User: {
    remove: async function() {
      database.removeUsers()
      return true
    },
    login: async function({email, password}) {
      const user = database.findUser(email, password)
      if (!user) {
        throw Error(401)
      }
      return user;
    },
    create: async function({email, first_name, last_name, password, confirm_password}) {
      if (email === undefined || password !== confirm_password || first_name === undefined || last_name === undefined) {
        throw Error(409)
      }
      const inserted = database.insertUser(u)
      if (!inserted) {
        throw Error(409)
      }
      return u;
    },
    update: async function(id, user) {
      let newUser = database.updateUser(id, user)
      if (!newUser) {
        throw Error(409)
      }
      return newUser;
    }
  },
};
