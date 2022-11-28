const user = require('../models/user');

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
        
    },
    getById(req, res) {
        return UserModel
          .findByPk(req.params.id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            return res.status(200).send(user);
          })
          .catch((error) => res.status(400).send(error));
      },
    update(req, res) {
        return UserModel
          .findByPk(req.params.id)
          .then(user => {
            if (!user) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            return user
              .update({
                userName: req.body.userName || user.userName,
                totalBalance: req.body.totalBalance || user.totalBalance
              })
              .then(() => res.status(200).send(user))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
    delete(req, res) {
      return UserModel
        .findByPk(req.params.id)
        .then(user => {
          if (!user) {
            return res.status(400).send({
              message: 'User Not Found',
            });
          }
          return user
            .destroy()
            .then(() => res.status(200).send("User is deleted successfully!"))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    
};