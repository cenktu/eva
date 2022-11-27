const Share = require('../models').Share;
const Portfolio = require('../models').Portfolio;
const UserModel = require('../models').User;



module.exports = {
    async buyShare(req, res) {
        const user = await this.checkUser(req.body.userID);
        const share = await this.checkShare(req.body.shareID);
        const portfolioCheck = await Portfolio.findAll({
            where: {
                userID: req.body.userID,
                shareID: req.body.shareID
            }
        });
        console.log(user);
        console.log(share);
        console.log(portfolioCheck);
        if (portfolioCheck === null) {
            //if not open new portfolio
            const newTransaction = await Portfolio.create({
                userID: user.userID,
                shareID: share.shareID,
                amount: req.body.amount
            });

        }
        else {
            //if one, update portfolio

        }
    },

    async checkUser(userID) {
        const user = await UserModel.findOne({ where: { userID: userID } });
        if (!user) {
            return res.status(400).send("User not exist");
        }
        return user;
    },

    async checkShare(shareID) {
        const share = await share.findOne({ where: { shareID: shareID } });
        if (!share) {
            return res.status(400).send("Share not exist");
        }
        return share;
    },

    async sell() {

    }
};