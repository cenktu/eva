const Share = require('../models').Share;
const Portfolio = require('../models').Portfolio;

module.exports = {
  list(req, res) {
    return Share
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((shares) => res.status(200).send(shares))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Share
      .findByPk(req.params.id)
      .then((share) => {
        if (!share) {
          return res.status(404).send({
            message: 'Share Not Found',
          });
        }
        return res.status(200).send(share);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Share
      .create({
        symbol: req.body.symbol,
        price: req.body.price || 0
      })
      .then((share) => res.status(201).send(share))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Share
      .findByPk(req.params.id)
      .then(share => {
        if (!share) {
          return res.status(404).send({
            message: 'Share Not Found',
          });
        }
        return share
          .update({
            symbol: req.body.symbol || share.symbol,
            rate: req.body.rate || share.rate
          })
          .then(() => res.status(200).send(share))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Share
      .findByPk(req.params.id)
      .then(share => {
        if (!share) {
          return res.status(400).send({
            message: 'Share Not Found',
          });
        }
        return share
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  async getAllShares(req, res) {
    const share = await Share.findAll();
    if (share === null) {
        return res.status(400).send('User not available')
    } else {
        return res.status(200).send(share)
    }
}
};