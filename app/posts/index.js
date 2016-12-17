const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true }
});

// Args (Singular Name of Collection, Schema)
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
