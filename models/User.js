const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  github_profile:{
    type:String,
    required: true
  },
  username:{
    type: String,
    required:true,
    unique: true
  },
  github_profile_img:{
    type: String,
    required: true
  },
  skills:[
    {
      type: String
    }
  ],
  developer_type:{
    type : String
  },
  location:{
    type: String
  }
  ,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  } 
});

module.exports = User = mongoose.model('user', UserSchema);
