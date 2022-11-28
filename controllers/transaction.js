const Share = require('../models').Share;
const Portfolio = require('../models').Portfolio;
const UserModel = require('../models').User;



module.exports = {
    async buyShare(req, res) {
        const user = await this.checkUser(req.body.userID);
        const share = await this.checkShare(req.body.shareID);
        /*const portfolioCheck = await Portfolio.findAll({
            where: {
                userID: req.body.userID,
                shareID: req.body.shareID
            }
        });
        console.log(user);
        console.log(share);
        console.log(portfolioCheck);
        if (portfolioCheck === null) {
            //if not, open new portfolio
            const newTransaction = await Portfolio.create({
                userID: user.id,
                shareID: share.id,
                amount: req.body.amount
            });

        }
        else {
            //if one, update portfolio

        }*/

        // with find or create
        const [portfolio,created] = await Portfolio.findOrCreate({
            where:{
                userID: this.user(req.params.id),
                shareID: this.share(req.params.id)
            },
            default:{
                amount: req.body.amount

            }
        }) 
    },

    async checkUser(userID) {
        const user = await UserModel.findByPk({ where: { id: userID } });
        if (!user) {
            return res.status(400).send("User not exist");
        }
        return user;
    },

    async checkShare(id) {
        const share = await Share.findByPk({ where: { id: id } });
        if (!share) {
            return res.status(400).send("Share not exist");
        }
        return share;
    },

    async sell() {

    }
};