const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReadingList = new Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  post_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  post_title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required:true
  },
  post_description:{
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model('ReadingList', ReadingList);
