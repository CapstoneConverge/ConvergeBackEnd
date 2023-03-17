const {} = require("../controllers/like")

const express = require("express");





const router = express.Router()

//endpoints for likes

router.get("/", likeControllers.getAllLikes);
router.get("/:id", likeControllers.getAllLikes);
router.post('/:id', authenticate, likeControllers.addLikes);
router.delete("/", authenticate, likeControllers.deleteLikes);


module.exports = router
 


