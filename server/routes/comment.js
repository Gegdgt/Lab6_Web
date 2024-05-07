const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  video_id: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  comment_text: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
