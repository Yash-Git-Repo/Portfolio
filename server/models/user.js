const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is Required !"],
  },
  email: {
    type: String,
    required: [true, "Email is Required !"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is Required !"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me field is Required !"],
  },
  password: {
    type: String,
    required: [true, "Password is Required !"],
    minLength: [4, "Password must contain at least 4 characters !"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioUrl: {
    type: String,
  },
  githubUrl: String,
  instagramUrl: String,
  facebookUrl: String,
  twitterUrl: String,
  linkedInUrl: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongoose.model("User" , userSchema)