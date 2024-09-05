const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    requires: [true, "Timeline Required !"],
  },
  description: {
    type: String,
    requires: [true, "Description Required !"],
  },
  timeline: {
    from: {
      type: String,
      required: [true, "Starting date is required !"],
    },
    to: String,
  },
});

module.exports = mongoose.model("Timeline", timelineSchema);
