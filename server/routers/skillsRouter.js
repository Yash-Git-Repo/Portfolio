const router = require("express").Router();
const skillsController = require("../controllers/skillsController");
const requireUser = require("../middlewares/requireUser");

router.get(
  "/getAllSkills",
  skillsController.getAllSkill
);
router.post(
  "/addSkill",
  requireUser,
  skillsController.addSkill
);
router.put(
    "/updateSkill/:skillId",
    requireUser,
    skillsController.updateSkill
  );
router.delete(
  "/deleteSkill/:skillId",
  requireUser,
  skillsController.deleteSkill
);
module.exports = router;
