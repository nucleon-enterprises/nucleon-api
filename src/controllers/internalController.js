const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    async show(req, res) {
        if (!req.params.id) {
            const users = await User.find();
            return res.json(users);
        } else {
            const users = await User.find({ id: req.params.id });
            return res.json(users);
        }
    },
}