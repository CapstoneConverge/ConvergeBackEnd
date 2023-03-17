const pool = require("../dbconfig")

class PostModel {
    static async createPostInDb(post, user) {
        let query = await pool.query("INSERT INTO posts (post, user)VALUES ($1, $2) RETURNING id, user",
        [post, user])
        return query.rows[0]
    }
}

module.exports = PostModel