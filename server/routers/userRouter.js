const router = require("express").Router();
const userController = require("../controllers/userController");
const requireUser = require("../middlewares/requireUser");

router.get("/getUser", requireUser, userController.getUser);
router.get("/getUserForPortfolio", userController.getUserForPortfolio);
router.put("/updateUser", requireUser, userController.updateUser);
router.put("/updatePassword", requireUser, userController.updatePassword);

module.exports = router;
