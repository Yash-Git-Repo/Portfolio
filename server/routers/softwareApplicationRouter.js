const router = require("express").Router();
const softwareApplicationController = require("../controllers/softwareApplicationController");
const requireUser = require("../middlewares/requireUser");

router.get(
  "/getAllSoftwareApplication",
  softwareApplicationController.getAllSoftwareApplication
);
router.post(
  "/addSoftwareApplication",
  requireUser,
  softwareApplicationController.addSoftwareApplication
);
router.delete(
  "/deleteSoftwareApplication/:softwareApplicationId",
  requireUser,
  softwareApplicationController.deleteSoftwareApplication
);
module.exports = router;
