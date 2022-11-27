const router = require("express").Router();
const ShareController = require('../controllers/share');

router.post("/", ShareController.add);
router.get("/", ShareController.getAllShares);

module.exports = router;