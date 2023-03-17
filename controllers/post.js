const {PostModel} = require("../models/post")


const createPosts = async (req, res)=>{
    const {post, user} = req.body
    try{
        const createdPost = await PostModel.createPosts(post, user)
        res.send(createPosts)
    }
    catch (e) {
        res.send(400).send(e)
    }


}


module.exports= {
    createPosts,

} 