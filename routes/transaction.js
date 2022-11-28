const router = require("express").Router();
const TransactionController  = require("../controllers/transaction");

router.post("/buy", TransactionController.buyShare);
router.post("/sell", TransactionController.sellShare);
module.exports = router;