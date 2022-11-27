const UserModel = require('../models').User;

module.exports = {
    async add(req, res) {
        return UserModel
            .create({
                userName: req.body.userName,
                totalBalance: req.body.totalBalance || 1000,

            })
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
    },

    async getAllUsers(req, res) {
        const user = await UserModel.findAll();
        if (user === null) {
            return res.status(400).send('User not available')
        } else {
            return res.status(200).send(user)
        }
    }
};