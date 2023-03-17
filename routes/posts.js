const {getPosts, createPosts} = require("../controllers/post.js")

const express = require("express");

const router = express.Router()



//endpoints for posts
router.get("/", getPosts)
router.post("/", createPosts)  

module.exports = router