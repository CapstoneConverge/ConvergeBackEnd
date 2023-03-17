const Likes = require('../models/like')
const getAllLikes = async (req, res) => {
  const likes = await Likes.totalLikes(req.params.id);
  res.status(200).send(likes);
};
const addLikes = async (req, res) => {
  const {
    photos_id, 
  } = req.body;
  const users_id = req.id
  const hasLiked = await Likes.hasLiked(photos_id, users_id)
  console.log(hasLiked)
  if(!hasLiked) {
    await Likes.addLike({
      users_id,
      photos_id,
    });
  } else {
    await Likes.deleteLikes(users_id)
  }
  const totalLikes = await Likes.totalLikes(photos_id)
  if(totalLikes){
    res.status(200).send(totalLikes)
  }else{
    res.status(404).send("no likes")
  }
};
const deleteLikes = async (req, res) => {
  const { id } = req
  const like = await Likes.singleLike(req.body.id);
  if(id !== like.users_id) {
    res.status(403).send('False validation')
  } else {
    const deletedLike = await Likes.deleteLikes(req.body.id);
    const allLikes = await Likes.getAllLikes(req.body.photos_id)
    res.status(200).send(allLikes);
  }
}
module.exports = {
  getAllLikes,
  addLikes,
  deleteLikes,
}