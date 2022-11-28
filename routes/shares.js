const router = require("express").Router();
const ShareController = require('../controllers/share');

router.post("/", ShareController.add);
router.get("/all", ShareController.getAllShares);
router.get("/find/:id",ShareController.getById);
router.get("/get/:symbol",ShareController.getBySymbol);//?
router.get("/list",ShareController.list);
router.delete("/delete/:id",ShareController.delete);
router.put("/update/:id",ShareController.update);

module.exports = router;