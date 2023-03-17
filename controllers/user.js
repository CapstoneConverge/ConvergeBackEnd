const UserModel = require("../models/user") 
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAllUsers = async (req, res)=>{
    const allUsers = await UserModel.getAllUsersFromDB()

    res.send(allUsers)
}

const createUser = async (req, res) => {
    const { username, password } = req.body
    let hashedPassword = bcrypt.hashSync(password, 10)
    try {
      const createdUser = await UserModel.createUserInDB(username, hashedPassword)
      var token = jwt.sign({ id: createdUser.id }, "unknownkey")
      res.send({ token, createdUser })
    } catch (e) {
      res.status(400).send(e)
    }
  }

  const loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.loginUser(username, password)
    if (user && bcrypt.compareSync(password, user.password)) {
      var token = jwt.sign({ id: user.id }, "unknownkey")
      res.send({ token, user })
    } else {
      res.status(401).send("invalid username or password")
    }
  }


module.exports= {
getAllUsers, 
createUser,
loginUser,
}