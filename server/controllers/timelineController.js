const Timeline = require("../models/timeline");
const { success, error } = require("../utils/responseWrapper");

const getAllTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.find();
    return res.json(success(200, timeline));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const addTimeline = async (req, res) => {
  try {
    const { title, description, from, to } = req.body;
    if (!title || !description || !from || !to) {
      return res.json(error(404, "All fields are required"));
    }
    const timeline = await Timeline.create({
      title,
      description,
      timeline: { from, to },
    });
    console.log(timeline);

    return res.json(success(201, timeline));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const deleteTimeline = async (req, res) => {
  try {
    const { timelineId } = req.params;
    if (!timelineId) {
      return res.json(error(404, "Timeline id is required"));
    }
    const timeline = await Timeline.findById(timelineId);
    if (!timeline) {
      return res.json(error(404, "Timeline with associated id not found"));
    }
    await timeline.deleteOne();

    return res.json(success(200, "Timeline deleted successfully"));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

module.exports = {
  getAllTimeline,
  addTimeline,
  deleteTimeline,
};
