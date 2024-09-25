const User = require("../models/user");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require("../cloudinaryConfig");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  try {
    const userId = req._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json(error(404, "No user found !"));
    }
    return res.json(success(200, user));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);

    const newUserData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      aboutMe: req.body.aboutMe,
      portfolioUrl: req.body.portfolioUrl,
      githubUrl: req.body.githubUrl,
      instagramUrl: req.body.instagramUrl,
      facebookUrl: req.body.facebookUrl,
      twitterUrl: req.body.twitterUrl,
      linkedInUrl: req.body.linkedInUrl,
    };

    if (req.files && req.files.avatar) {
      const avatar = req.files.avatar;
      const profileImg = user.avatar.public_id;
      await cloudinary.uploader.destroy(profileImg);
      const cloudinaryAvatarResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          avatar.tempFilePath,
          { folder: "avatarImagesForPortfolioWebsite" },
          (err, result) => {
            if (err) {
              console.error("Cloudinary upload error:", err);
              return reject(err);
            }
            resolve(result);
          }
        );
      });
      newUserData.avatar = {
        public_id: cloudinaryAvatarResult.public_id,
        url: cloudinaryAvatarResult.url,
      };
    }

    if (req.files && req.files.resume) {
      const resume = req.files.resume;
      const resumeImg = user?.resume?.public_id;
      await cloudinary.uploader.destroy(resumeImg);
      const cloudinaryResumeResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          resume.tempFilePath,
          { folder: "resumeImagesForPortfolioWebsite" },
          (err, result) => {
            if (err) {
              console.error("Cloudinary upload error:", err);
              return reject(err);
            }
            resolve(result);
          }
        );
      });
      newUserData.resume = {
        public_id: cloudinaryResumeResult.public_id,
        url: cloudinaryResumeResult.url,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, newUserData, {
      new: true,
    });

    return res.status(200).json(success(200, updatedUser));
  } catch (e) {
    console.log(e);

    return res.status(500).json(error(500, e.message));
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req._id;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json(error(400, "All fields are required"));
    }
    const user = await User.findById(userId);
    const passwordMatched = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!passwordMatched) {
      return res.status(403).send(error(403, "Password is incorrect"));
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json(error(400, "Password did not match"));
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res
      .status(200)
      .json(success(200, "Password is successfully changed"));
  } catch (e) {
    return res.status(200).json(error(e.message));
  }
};

const getUserForPortfolio = async (req, res) => {
  try {
    const userId = "66e413d7a8669123d310c2e4";
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(error(404, "No user found !"));
    }
    return res.status(200).json(success(200, user));
  } catch (e) {
    return res.status(500).json(error(500, e.message));
  }
};

module.exports = {
  getUser,
  updateUser,
  updatePassword,
  getUserForPortfolio,
};
