module.exports = {
  insertUser: (u) => {
    let user = users.find((user) => user.id === u.id)
    if (user) {
      return false;
    } else {
      users = [...users, u]
      return true;
    }
  },
  removeUsers : () => {
    users = []
  },
  findUser: (email, password) => {
    let user = users.find((u) => u.user.email === email && u.user.password === password)
    if (user) {
      return user
    }
    return null
  },
  updateUser: (id, newUser) => {
    let user = users.find((u) => u.user.id === id)
    if (user) {
      users = users.map((u) => {
        if(u.user.id === id) {
          return {...u, user: {...newUser, id: u.user.id}};
        }
      })
      return users.find((u) => u.user.id === id)
    }
    return null
  }
}

let users = [];
