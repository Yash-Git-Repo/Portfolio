const cloudinary = require("../cloudinaryConfig");
const { error, success } = require("../utils/responseWrapper");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const signUpController = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.send(error(400, "Avatar and resume are required"));
    }

    const { avatar, resume } = req.files;

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

    const {
      fullName,
      email,
      phoneNumber,
      password,
      aboutMe,
      portfolioUrl,
      githubUrl,
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedInUrl,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password ||
      !phoneNumber ||
      !aboutMe ||
      !portfolioUrl
    ) {
      return res.send(error(400, "All Fields are required"));
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send(error(409, "User is already registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      aboutMe,
      portfolioUrl,
      githubUrl,
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedInUrl,
      avatar: {
        public_id: cloudinaryAvatarResult?.public_id,
        url: cloudinaryAvatarResult?.url,
      },
      resume: {
        public_id: cloudinaryResumeResult?.public_id,
        url: cloudinaryAvatarResult?.url,
      },
    });

    return res.send(success(201, "User created successfully"));
  } catch (e) {
    console.log(e);
    res.send(error(500, e.message));
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "All fields are required"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.send(error(404, "User is not registered"));
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.send(error(403, "Password is incorrect"));
    }

    const accessToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, { user, accessToken }));
  } catch (e) {
    res.send(error(500, e.message));
    console.log(e);
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "User logged out"));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

const generateAccessToken = (data) => {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "15m",
  });
  return token;
};
const generateRefreshToken = (data) => {
  const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: "1y",
  });
  return token;
};

const forgotPassword = async (req, res) => {
  let user;
  try {
    const { email } = req.body;
    user = await User.findOne({ email });
    if (!user) {
      return res.json(error(404, "User not found"));
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.DASHBOARD_URL}//password/reset/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      from: "no-reply@yourapp.com",
      subject: "Password Reset Request",
      text:
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `${resetUrl}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });

    return res.json(success(200, "Password reset email sent successfully"));
  } catch (e) {
    console.log(e);
    if (user) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save(); // Clean up changes
    }
    return res.json(error(500, e.message));
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params; 
    const { newPassword, confirmNewPassword } = req.body;

    if (!newPassword || !confirmNewPassword) {
      return res.json(error(400, "All fields are required"));
    }

    if (newPassword !== confirmNewPassword) {
      return res.json(error(400, "Passwords do not match"));
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find the user by the reset token and check if the token has expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.json(error(400, "Invalid or expired token"));
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.json(success(200, "Password has been reset successfully"));
  } catch (e) {
    return res.json(error(500, e.message));
  }
};

module.exports = {
  signUpController,
  loginController,
  logoutController,
  forgotPassword,
  resetPassword,
};
