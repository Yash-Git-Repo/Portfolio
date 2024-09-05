const router = require("express").Router();
const timeLineController = require("../controllers/timelineController");
const requireUser = require("../middlewares/requireUser");

router.get("/getAllTimeline", timeLineController.getAllTimeline);
router.post("/addTimeline",requireUser, timeLineController.addTimeline);
router.delete("/deleteTimeline/:timelineId", requireUser, timeLineController.deleteTimeline);
module.exports = router;
