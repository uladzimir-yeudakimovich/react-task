const generateId = () => Math.floor(Math.random() * 1e10);

class User {
  constructor({ id = generateId(), name, number } = {}) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.date = new Date();
  }

  static toResponse(user) {
    const { id, name, number } = user;
    return { id, name, number };
  }
}

module.exports = User;
