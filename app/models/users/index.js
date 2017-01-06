const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    first_name: { type: String },
    last_name: { type: String }
});

// Args (Singular Name of Collection, Schema)
const User = mongoose.model('User', userSchema);

module.exports = User;
