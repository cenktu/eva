const router = require("express").Router();
const TransactionController  = require("../controllers/transaction");

router.post("/buy", TransactionController.buyShare);
module.exports = router;