const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


// Post Model
const Post = require('../../models/Post');
const User = require("../../models/User");
const ReadingList = require('../../models/ReadingList');

// Get Posts
router.get("/",function(req,res){
  
  Post.find()
  .sort({ _id: -1 })
  .skip(parseInt(req.query.skip))
  .limit(parseInt(req.query.count))
  .then(data => res.json(data));
});

//Get Single Post
router.get("/single", function(req,res){
  Post.findById(req.query.id)
  .then(data => res.json(data))
  .catch(err => res.json(err))
})

//Get All Posts That The User has
router.get("/mypost", auth, function(req,res){
  console.log(req.user.id);
  Post.find({user:req.user.id})
  .then(data => res.json(data))
  .catch(err => res.json(err));
})


//Add Posts
router.post("/", auth , function(req,res){
  const {post,post_title,post_description,post_created, tags} = req.body;

  if(!post || !post_title || !post_description || !post_created || !tags.firstTag || !tags.secondTag || !tags.thirdTag || !tags.fourthTag) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
 
  User.findById(req.user.id)
  .then(user => {
      const newPost = new Post({
      user:req.user.id,
      post:req.body.post,
      post_title: req.body.post_title,
      post_description: req.body.post_description,
      post_username: user.username,
      post_created: req.body.post_created,
      tags:{
        firstTag: req.body.tags.firstTag,
        secondTag: req.body.tags.secondTag,
        thirdTag: req.body.tags.thirdTag,
        fourthTag: req.body.tags.fourthTag
      },
      github_username: user.github_profile,
      user_image: user.github_profile_img
    }); 
    newPost.save().then(posts => res.json(posts));

  })


})


// Delete Post
router.delete('/:id', auth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.user == req.user.id ? post.remove().then(post=>res.json(post)) : res.json({error:"You are not the uesr"}))
    .catch(err => res.json({error:"No Post Found"}))
});

//Add To Reading List
router.post("/reading",auth,(req,res)=>{
  const newReadingList = new ReadingList({
    user_id: req.user.id,
    post_id:req.body.post_id,
    post_title: req.body.post_title,
    date: req.body.date,
    post_description: req.body.post_description
  }); 
  newReadingList.save().then(reading => res.json(reading));
})

//Delete From Reading List
router.get("/reading",(req,res)=>{
  ReadingList.findByIdAndDelete(req.query.id)
  .then(data=> {
    ReadingList.find({user_id :req.query.userid})
    .then(data => {res.json(data)})
    .catch(error=> res.json({error:"erroru 404"}))
  })
  .catch(err=> console.log(err))
})

//Get Reading List
router.get("/readinglist/:userid",(req,res)=>{
  ReadingList.find({user_id :req.params.userid})
  .then(data => {res.json(data)})
  .catch(error=> res.json({error:"erroru 404"}))
})

//Add Like
router.post("/like/:postid",auth,function(req,res){
  Post.findById(req.params.postid).then(post =>{

    if(post.likes.filter(like => like.user.toString() == req.user.id).length > 0){
      return res.status(400).json({error:"LIKED"});
    }else{
      post.likes.unshift({user:req.user.id});
      post.save().then(post => res.json(post))
    }
  })
});

//Remove Like // Not Done
router.delete("/unlike/:postid",auth,function(req,res){
  Post.findById(req.params.postid).then(post =>{

    if(post.likes.filter(like => like.user.toString() == req.user.id).length > 0){
      const newLikes = post.likes.filter(like => like.user.toString() != req.user.id);
      post.likes = newLikes;

      post.save().then(post => res.json(post))
    }else{
      post.likes.unshift({user:req.user.id});
      post.save().then(post => res.json(post))
    }

  })
});

//Add comments
router.post("/comment",auth,function(req,res){
 User.findById(req.user.id)
 .then(user=>{
  Post.findById(req.body.post_id).then(post =>{
    const newComment = {
      text:req.body.text,
      name:user.username,
      user:req.user.id
    }
 
    post.comments.unshift(newComment);
    post.save().then(post => res.json(post))
    .catch(err => res.status(404).json({error:"Post not found"}))
 
   })
 })

 


});

//Delete Comment
router.delete("/comment/:postid/:commentid", auth, function(req,res){
  Post.findById(req.params.postid).then(post =>{
    post.comments.map(comment=>{
      if(comment.user.toString() == req.user.id){
        console.log("Matched")
        if(comment.id == req.params.commentid){
          const newCommentArr = post.comments.filter(comm=> comm.id != req.params.commentid);
          post.comments = newCommentArr;
          post.save().then(post => res.json(post))
        }
      }
    }) 
   })
})

module.exports = router;