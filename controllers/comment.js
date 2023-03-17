const Comments = require("../models/comment");
const allComments = async (req, res) => {
    const comments = await Comments.getAllComments(req.params.id);
    res.status(200).send(comments); 
  };
  const addComment = async (req, res) => {
    const {
      commentary,
      photos_id,
    } = req.body;
    const users_id = req.id
    const comment = await Comments.addComment({
      photos_id,
      users_id,
      commentary
    });
    console.log(comment)
    const fullComment = await Comments.getSingleComment(comment.id);
    console.log(fullComment)
    if (fullComment) {
      res.status(200).send(fullComment);
    } else {
      res.status(404).send("comment not found");
    }
  };
  const updateComment = async (req, res) => {
    const {
      commentary,
      comment_id,
      photos_id
    } = req.body;
    const {id} = req
    const comment = await Comments.getSingleComment(comment_id)
    if (id !== comment.users_id) {
      res.status(403).send('False validation')
    }else{
      const comments = await Comments.updateComment(commentary, comment_id);
    const allComments = await Comments.getAllComments(photos_id);
    res.status(200).send(allComments);
    }
  }
  const deleteComment = async (req, res) => {
    const { id } = req
    const comment = await Comments.getSingleComment(req.body.id);
    if(id !== comment.users_id) {
      res.status(403).send('False validation')
    } else {
      const deletedComment = await Comments.deleteComment(req.body.id);
      const allComments = await Comments.getAllComments(req.body.photos_id)
      res.status(200).send(allComments);
    }
  }
  module.exports = {
    allComments,
    updateComment,
    addComment,
    deleteComment,
  };