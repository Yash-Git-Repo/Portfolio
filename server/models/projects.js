const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
  title: String,
  descritption: String,
  gitRepoLink: String,
  projectLink: String,
  tchnologies: String,
  stack: String,
  deployed: String,
  projectBanner: {
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

module.exports = mongoose.model("Projects", projectsSchema);
