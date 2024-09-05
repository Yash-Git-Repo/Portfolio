const router = require("express").Router();
const projectController = require("../controllers/projectController");
const requireUser = require("../middlewares/requireUser");

router.get(
  "/getAllProjects",
  projectController.getAllProjects
);
router.get(
    "/getSingleProject/:projectId",
    projectController.getSingleProjects
  );
router.post(
  "/addProject",
  requireUser,
  projectController.addProject
);
router.put(
    "/updateProject/:projectId",
    requireUser,
    projectController.updateProject
  );
router.delete(
  "/deleteProject/:projectId",
  requireUser,
  projectController.deleteProject
);
module.exports = router;
