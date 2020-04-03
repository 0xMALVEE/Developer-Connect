// Posts, likes, comments
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = require("date-and-time");

// Create Schema
const PostSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:"user"
  },
  // post_username is the name of the user that created the post
  post_username:{
    type:String,
    required: true
  },
  post_title:{
    type: String,
    required: true
  },
  post_description:{
    type:String,
    required: true
  },
  user_image:{
    type : String,
    required: true
  }
  ,
  post: {
    type: String,
    required: true
  },
  github_username:{
    type: String,
    required: true
  },
  tags:{
      firstTag:{
        type: String,
        required: true
      },
      secondTag:{
        type: String,
        required: true
      },
      thirdTag:{
        type: String,
        required: true
      },
      fourthTag:{
        type: String,
        required: true
      }
  }
  
  ,
  likes: [
    {
      user:{
        type:Schema.Types.ObjectId,
        ref:"user"
      }
    }
  ],
  comments: [{
    user:{
      type:Schema.Types.ObjectId,
      ref:"user"
    },
    text:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    comment_created:{
      type:Date,
      default:Date.now
    }
  }],
  post_created: {
    type: String,
    required: true
    // default: date.format(new Date(Date.now()), date.compile('D MMMM YYYY HH:mm A'))
  }
});

module.exports = Posts = mongoose.model('post', PostSchema);
