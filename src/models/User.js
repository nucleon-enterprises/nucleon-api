const mongoose = require('mongoose');
const bcript = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    nickCode: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    birthdate: {
        type: Date,
        required: [true, "can't be blank"],
    },
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
UserSchema.pre('save', async function (next) {
    const hash = await bcript.hash(this.password, 10);
    this.password = hash;

    next();
});

mongoose.model('User', UserSchema);