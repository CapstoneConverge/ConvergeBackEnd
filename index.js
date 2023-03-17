const userRoutes = require("./routes/users.js")
const postRoutes = require("./routes/posts.js")
const commentRoutes = require("./routes/comments.js")
const likeRoutes = require("./routes/likes.js") 


const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./dbconfig')
const PORT = process.env.PORT || 3001;


/// Middleware ///
app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)
app.use("/likes", likeRoutes) 



app.use(cors());
app.use(express.json());

/// Create endpoints




// app.get('/todos', async (req,res) => {
//     try{
//         const allTodos = await pool.query("SELECT * from todo")
//         res.send(allTodos.rows)

//     }

//     catch (err) {
//         console.error(err.message)
//     }
// })

// app.post('/todos', async (req,res) => {
    
//     try{
//         const {task} = req.body
//         const allTodos = await pool.query("INSERT INTO todo(task) VALUES($1) RETURNING *", [task])
//         res.end()
//     }
//     catch (err) {
//         console.error(err.message)
//     }
// })


// console.log(process.env.NODE_ENV)

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} `)
})