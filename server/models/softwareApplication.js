const mongoose = require("mongoose");

const softwareApplicationSchema = new mongoose.Schema({
  name: String,
  icon: {
    public_id: {
      type: String,
      required: true,
    },
    url:{
        type: String,
        required: true,
    }
  },
});

module.exports = mongoose.model(
  "softwareApplication",
  softwareApplicationSchema
);
