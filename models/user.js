const pool = require("../dbconfig")

class UserModel {
  static async getAllUsersFromDB() {

    const query = await pool.query("SELECT * FROM users;")
    return query.rows

  }

  static async createUserInDB(username, password) {
    let query = await pool.query("INSERT INTO users (username, email, password, name)VALUES ($1, $2, $3, $4) RETURNING id, username;", 
    [username, email, password, name])
    return query.rows[0]
  }

  static async loginUser(username, password) {
    let query = await pool.query("SELECT * FROM users WHERE username = $1 ", [username])
    return query.rows[0]
  }
}





module.exports = UserModel