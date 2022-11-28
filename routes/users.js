const router = require("express").Router();
const UserController = require('../controllers/user');

router.post("/", UserController.add);
router.get("/all", UserController.getAllUsers);
router.get("/find/:id",UserController.getById);
router.delete("/delete/:id",UserController.delete);
router.put("/update/:id",UserController.update);


module.exports = router;