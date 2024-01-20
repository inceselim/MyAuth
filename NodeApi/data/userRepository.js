class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        email TEXT)`;
    return this.dao.run(sql);
  }

  getAll() {
    return this.dao.all(`SELECT * FROM users`);
  }

  getById(id) {
    return this.dao.get(`SELECT * FROM users WHERE id = ?`, [id]);
  }

  getByUsername(username) {
    return this.dao.get(`SELECT * FROM users WHERE username = ?`, [username]);
  }

  getByEmail(email) {
    return this.dao.get(`SELECT * FROM users WHERE email = ?`, [email]);
  }

  create(username, password, email) {
    console.log(username, password, email);
    return this.dao.run(
      `INSERT INTO users (username, password, email) VALUES (?,?,?)`,
      [username, password, email]
    );
  }

  update(user) {
    const { id, username, password, email } = user;
    return this.dao.run(
      `UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?`,
      [username, password, email, id]
    );
  }

  delete(id) {
    return this.dao.run(`DELETE FROM users WHERE id = ?`, [id]);
  }
}

module.exports = UserRepository;
