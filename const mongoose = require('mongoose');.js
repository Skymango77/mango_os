const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    pi_username: { type: String, required: true, unique: true },
    nickname: { type: String, default: 'Mango Pioneer' },
    profile_image_url: { type: String, default: '' },
    status_message: { type: String, default: '' },
    mango_balance: { type: Number, default: 0 },
    is_business_profile: { type: Boolean, default: false } // Multi-profile
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);