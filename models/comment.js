const { pool } = require("../dbconfig");
class Comments {
  static async getAllComments(id) {
    const database =
      'SELECT comments.id, commentary, photos_id, users_id, name, username, email FROM comments JOIN users ON "comments".users_id = users.id WHERE photos_id = $1';
    const query = await pool.query(database, [id]);
    return query.rows;
  }
  static async getSingleComment(id) {
    const database =
      'SELECT comments.id, commentary, photos_id, users_id, name, username, email FROM comments JOIN users ON "comments".users_id = users.id WHERE comments.id = $1;';
    const query = await pool.query(database, [id]);
    return query.rows[0];
  }
  static async updateComment(commentary, comment_id) {
    const database = "UPDATE comments SET commentary = $1 WHERE id = $2;";
    const query = await pool.query(database, [commentary, comment_id]);
    return query[0];
  }
  static async addComment({ commentary, photos_id, users_id }) {
    const query =
      "INSERT INTO comments (commentary, photos_id, users_id) VALUES ($1, $2, $3) RETURNING *;";
    const queryResults = await pool.query(query, [
      commentary,
      photos_id,
      users_id,
    ]);
    return { ...queryResults.rows[0] };
  }
  static async deleteComment(id) {
    const database = "DELETE FROM comments WHERE id = $1;";
    const query = await pool.query(database, [id]);
    return query.rows[0];
  }
}
module.exports = Comments;