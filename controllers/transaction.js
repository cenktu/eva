const Share = require('../models').Share;
const Portfolio = require('../models').Portfolio;
const UserModel = require('../models').User;



module.exports = {
    async buyShare(req, res) {
        
        const user = await UserModel.findOne({ where: { id: (req.body.userID) } });
        const share = await Share.findOne({ where: { id: (req.body.shareID) } });
        if (!user) {
            return res.status(400).send("User not exist");
        }
        else if (!share) {
            return res.status(400).send("Share not exist");
        }
        else {
            if(user.totalBalance< share.price * (req.body.amount)){
                return res.status(400).send("Insufficient amount");
            }
            else{
                const portfolioCheck = await Portfolio.findOne({
                    where: {
                        userID: user.id,
                        shareID: share.id
                    }
                });

                if (!portfolioCheck) {
                    const newPortfolio = await Portfolio.create({
                        userID: user.id,
                        shareID: share.id,
                        amount: req.body.amount
                    })

                }
                else {
                    
                    portfolioCheck.update({
                        amount: portfolioCheck.amount + req.body.amount
                    })

                }
                user.update({
                    totalBalance: user.totalBalance - (share.price * (req.body.amount))
                })
                return res.status(200).send(portfolioCheck);
            }
        }

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

    async sellShare(req, res) {
        const user = await UserModel.findOne({ where: { id: (req.body.userID) } });
        const share = await Share.findOne({ where: { id: (req.body.shareID) } });
        if (!user) {
            return res.status(400).send("User not exist");
        }
        else if (!share) {
            return res.status(400).send("Share not exist");
        }
        else {
            const portfolioCheck = await Portfolio.findOne({
                where: {
                    userID: user.id,
                    shareID: share.id
                }
            });

            if (!portfolioCheck) {
                return res.status(400).send("Portfolio does not exist !");
            }
            else if (portfolioCheck.amount < req.body.amount) {
                return res.status(400).send("Insufficient amount !");

            }
            else {
                portfolioCheck.update({
                    amount: portfolioCheck.amount - req.body.amount
                })
            }
            var x = parseFloat(user.totalBalance)
            var y = parseFloat(share.price)
            var z = req.body.amount
            var multiply = parseFloat(y * z).toFixed(2)
            var sum = (+x + +multiply)
            //console.log(sum + " " + multiply+" "+y);
            user.update({
                totalBalance: sum
            })
            return res.status(200).send(portfolioCheck);
        }
    }
};