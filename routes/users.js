const router = require("express").Router();
const UserController = require('../controllers/user');

router.post("/", UserController.add);
router.get("/", UserController.getAllUsers);


module.exports = router;