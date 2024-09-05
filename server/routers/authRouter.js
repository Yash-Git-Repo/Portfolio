const router = require("express").Router();
const authController = require("../controllers/authController");
const requireUser = require("../middlewares/requireUser");

router.post("/signUp", authController.signUpController);
router.post("/login", authController.loginController);
router.get("/logout", requireUser, authController.logoutController);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);


module.exports = router;
