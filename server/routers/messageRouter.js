const router = require("express").Router();
const messageController = require("../controllers/messageController");
const requireUser = require("../middlewares/requireUser");

router.get("/getAllMessages", messageController.getAllMessages);
router.post("/sendMessage", messageController.sendMessage);
router.delete("/deleteMessage/:messageId", requireUser, messageController.deleteMessage);
module.exports = router;
