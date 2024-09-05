const Message = require("../models/message");
const { success, error } = require("../utils/responseWrapper");

const getAllMessages = async (req, res) => {
  try {
    const data = await Message.find();
    return res.json(success(200, data));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const sendMessage = async (req, res) => {
  try {
    const { senderName, subject, message } = req.body;
    if (!senderName || !subject || !message) {
      return res.json(error(404, "Please fill full form"));
    }

    const data = await Message.create({ senderName, subject, message });

    return res.json(success(200, "Message sent successfully"));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId);
    if (!message) {
      return res.json(error(400, "Message is already deleted"));
    }
    await message.deleteOne();
    return res.json(success(200, "Message deleted"));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

module.exports = {
  sendMessage,
  getAllMessages,
  deleteMessage,
};
