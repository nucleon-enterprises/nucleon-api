const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).send({ error: 'No token provided' });
    }

    const hashInput = parseInt(Date.now()/10000) + authConfig.secret;

    if (await bcrypt.hash(hashInput, 10) != token) {
        return res.status(400).send({ error: 'Wrong token provided' });
    }

    next();
}