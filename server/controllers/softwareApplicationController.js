const SoftwareApplication = require("../models/softwareApplication");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require("../cloudinaryConfig");

const getAllSoftwareApplication = async (req, res) => {
  try {
    const softwareApplications = await SoftwareApplication.find();
    return res.json(success(200, softwareApplications));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const addSoftwareApplication = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.send(error(400, "Software Application icon is required"));
    }

    const { icon } = req.files;
    const { name } = req.body;

    if (!name) {
      return res.json(error(400, "Software Application name is required "));
    }

    const cloudinaryIconResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        icon.tempFilePath,
        { folder: "softwareIconForPortfolioWebsite" },
        (err, result) => {
          if (err) {
            console.error("Cloudinary upload error:", err);
            return reject(err);
          }
          resolve(result);
        }
      );
    });

    const softwareApplication = await SoftwareApplication.create({
      name,
      icon: {
        public_id: cloudinaryIconResult?.public_id,
        url: cloudinaryIconResult?.url,
      },
    });
    return res.json(success(200, softwareApplication));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const deleteSoftwareApplication = async (req, res) => {
  try {
    const { softwareApplicationId } = req.params;
    if (!softwareApplicationId) {
      return res.json(error(404, "softwareApplication id is required"));
    }

    const softwareApplication = await SoftwareApplication.findById(
      softwareApplicationId
    );

    if (!softwareApplication) {
      return res.json(
        error(404, "Software Application with associated id not found")
      );
    }

    const softwareApplicationIcon = softwareApplication?.icon?.public_id;
    await cloudinary.uploader.destroy(softwareApplicationIcon);
    await softwareApplication.deleteOne();

    return res.json(success(200, "Software application deleted successfully"));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

module.exports = {
  getAllSoftwareApplication,
  addSoftwareApplication,
  deleteSoftwareApplication,
};
