const cloudinary = require("../cloudinaryConfig");
const { error, success } = require("../utils/responseWrapper");
const Projects = require("../models/projects");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    return res.json(success(200, projects));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const getSingleProjects = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return res.json(error(400, "Project Id is required"));
    }
    const project = await Projects.findById(projectId);
    if (!project) {
      return res.json(error(400, "Project with associated Id not found"));
    }
    return res.json(success(200, project));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const addProject = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.send(error(400, "Project banner image is required"));
    }

    const { projectBanner } = req.files;
    const {
      title,
      descritption,
      gitRepoLink,
      projectLink,
      technologies,
      stack,
      deployed,
    } = req.body;

    if (
      !title ||
      !descritption ||
      !gitRepoLink ||
      !projectLink ||
      !technologies ||
      !stack ||
      !deployed
    ) {
      return res.json(error(400, "All fields are required "));
    }

    const cloudinaryProjectBannerResult = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader.upload(
          projectBanner.tempFilePath,
          { folder: "projectBannerForPortfolioWebsite" },
          (err, result) => {
            if (err) {
              console.error("Cloudinary upload error:", err);
              return reject(err);
            }
            resolve(result);
          }
        );
      }
    );

    const project = await Projects.create({
      title,
      descritption,
      gitRepoLink,
      projectLink,
      technologies,
      stack,
      deployed,
      projectBanner: {
        public_id: cloudinaryProjectBannerResult?.public_id,
        url: cloudinaryProjectBannerResult?.url,
      },
    });
    return res.json(success(200, project));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const newProjectData = {
      title: req.body.title,
      descritption: req.body.descritption,
      gitRepoLink: req.body.gitRepoLink,
      projectLink: req.body.projectLink,
      technologies: req.body.technologies,
      stack: req.body.stack,
      deployed: req.body.deployed,
    };

    const project = await Projects.findById(projectId);

    if (req.files && req.files.projectBanner) {
      const projectBanner = req.files.projectBanner;
      const projectBannerImgId = project.projectBanner.public_id;
      await cloudinary.uploader.destroy(projectBannerImgId);
      const cloudinaryprojectBannerImgResult = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader.upload(
            projectBanner.tempFilePath,
            { folder: "projectBannerForPortfolioWebsite" },
            (err, result) => {
              if (err) {
                console.error("Cloudinary upload error:", err);
                return reject(err);
              }
              resolve(result);
            }
          );
        }
      );
      newProjectData.projectBanner = {
        public_id: cloudinaryprojectBannerImgResult.public_id,
        url: cloudinaryprojectBannerImgResult.url,
      };
    }

    const updatedProject = await Projects.findByIdAndUpdate(
      projectId,
      newProjectData,
      {
        new: true,
      }
    );

    return res.json(success(200, updatedProject));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return res.json(error(400, "Project Id is required"));
    }
    const project = await Projects.findById(projectId);
    if (!project) {
      return res.json(error(400, "Project with associated Id not found"));
    }

    await project.deleteOne();
    return res.json(success(200, "Project deleted successfully"));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

module.exports = {
  getAllProjects,
  getSingleProjects,
  addProject,
  updateProject,
  deleteProject,
};
