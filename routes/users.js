const {getAllUsers, createUser, loginUser} = require("../controllers/user.js")
const express = require("express");

const router = express.Router()







 
//endpoints for users
router.get("/", getAllUsers)

router.post("/register", createUser)
router.post("/login", loginUser)

module.exports = router 