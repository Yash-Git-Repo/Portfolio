const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  title: String,
  proficiency: String,
  icon: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Skills", skillsSchema);
