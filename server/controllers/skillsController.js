const Skills = require("../models/skills");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require("../cloudinaryConfig");

const getAllSkill = async (req, res) => {
    try {
        const skills = await Skills.find();
        return res.json(success(200, skills));
      } catch (e) {
        return res.json(error(500, e.message));
      }
};

const addSkill = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send(error(400, "Skill icon is required"));
    }

    const { icon } = req.files;
    const { title, proficiency } = req.body;

    if (!title || !proficiency) {
      return res.status(400).json(error(400, "Title and Proficiency are required "));
    }

    const cloudinaryIconResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        icon.tempFilePath,
        { folder: "skillsIconForPortfolioWebsite" },
        (err, result) => {
          if (err) {
            console.error("Cloudinary upload error:", err);
            return reject(err);
          }
          resolve(result);
        }
      );
    });

    const skills = await Skills.create({
      title,
      proficiency,
      icon: {
        public_id: cloudinaryIconResult?.public_id,
        url: cloudinaryIconResult?.url,
      },
    });
    return res.status(200).json(success(200, skills));
  } catch (e) {
    return res.status(500).json(error(500, e.message));
  }
};
const updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    if (!skillId) {
      return res.json(400, "Skill Id is required");
    }
    const { proficiency } = req.body;

    const skill = await Skills.findByIdAndUpdate(
      skillId,
      { proficiency },
      {
        new: true,
      }
    );
    return res.json(success(200, skill));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    if (!skillId) {
      return res.status(404).json(error(404, "Skill id is required"));
    }

    const skill = await Skills.findById(skillId);

    if (!skill) {
      return res.status(404).json(error(404, "Skill with associated id not found"));
    }

    const skillIcon = skill?.icon?.public_id;
    await cloudinary.uploader.destroy(skillIcon);
    await skill.deleteOne();

    return res.status(200).json(success(200, "Skill deleted successfully"));
  } catch (e) {
    return res.status(500).json(error(500, e.message));
  }
};

module.exports = {
  getAllSkill,
  addSkill,
  updateSkill,
  deleteSkill,
};
