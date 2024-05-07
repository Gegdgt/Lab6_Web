const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    video_id: Number,
    name: String,
    duration: Number, // Duración en segundos
    views: Number,
    creator_id: Number, // Referencia al ID del creador en la colección Usuarios
    creation_date: String,
    description: String,
    tags: [{
        tag: String
    }],
    comments: [{
        user: String,
        date: String,
        comment_text: String
    }],
});

const Video = mongoose.model('Video', VideoSchema, 'Videos');
module.exports = Video;
