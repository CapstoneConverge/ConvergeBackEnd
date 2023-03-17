const { pool } = require("../dbconfig.js");
class Likes {
  static async totalLikes(id) {
    const database = 'SELECT COUNT(*) FROM likes WHERE photos_id=$1;';
    const databaseResults = await pool.query(database, [id]);
    return databaseResults.rows[0];
  }
  static async singleLike(id) {
    const database = 'SELECT likes.id, users_id, photos_id, users_id, name, username, email FROM likes JOIN users ON "likes".users_id = users.id WHERE photos_id = $1;';
    const databaseResults = await pool.query(database, [id]);
    return databaseResults.rows[0];
  }
  static async hasLiked(photos_id, users_id) {
    const database = 'SELECT likes.id, users_id, photos_id, users_id, name, username, email FROM likes JOIN users ON "likes".users_id = users.id WHERE photos_id = $1 AND users_id = $2;';
    const databaseResults = await pool.query(database, [photos_id, users_id]);
    return databaseResults.rows[0];
  }
  static async addLike({users_id, photos_id}) {
    const database = 'INSERT INTO likes (users_id, photos_id) VALUES ($1, $2) RETURNING *;'
    const databaseResults = await pool.query(database, [users_id, photos_id]);
    return databaseResults.rows[0];
  }
  static async deleteLikes(id) {
    const database = 'DELETE FROM likes WHERE users_id = $1;'
    const unlike = await pool.query(database, [id]);
    return unlike.rows[0];
  }
}
module.exports = Likes;