const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {
    async register(req, res) {

        const { nickname, nickCode } = req.body;

        const possibleUser = await User.findOne({ nickname, nickCode });

        if (possibleUser) {
            return res.status(400).send({ error: "nickname and code already in use"});
        }

        try {
            const user = await User.create(req.body);
            user.password = undefined;

            return res.json(user);
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    },
    async authenticate(req, res) {
        const { nick, password } = req.body;

        const userByEmail = await User.findOne({ email: nick }).select('+password');
        
        const [ nickname, nickCode ] = nick.split('#');
        
        const userByNick = await User.findOne({ nickname, nickCode: parseInt(nickCode) }).select('+password');

        if (!userByEmail && !userByNick) {
            return res.status(400).send({ error: "User not found"});
        }

        const user = userByEmail ? userByEmail : userByNick;

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: "Invalid password" });
        }

        user.password = undefined;

        const token = generateToken({ id: user.id });

        return res.json({ user, token });
    },
    async show(req, res) {
        const users = await User.find();
        return res.json(users);
    }
}