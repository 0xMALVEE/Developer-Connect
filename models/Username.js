const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UsernameSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"user"
  }
});

module.exports = Username = mongoose.model('username', UsernameSchema);
