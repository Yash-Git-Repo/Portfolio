import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "@/redux/slices/userSlice";
import { Button } from "@/components/ui/button";

const UpdateProfile = () => {
  const user = useSelector((state) => state.user.user);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || "");
  const [portfolioUrl, setPortfolioUrl] = useState(user?.portfolioUrl || "");
  const [linkedInUrl, setLinkedInUrl] = useState(user?.linkedInUrl || "");
  const [githubUrl, setGithubUrl] = useState(user?.githubUrl || "");
  const [instagramUrl, setInstagramUrl] = useState(user?.instagramUrl || "");
  const [twitterUrl, setTwitterUrl] = useState(user?.twitterUrl || "");
  const [facebookUrl, setFacebookUrl] = useState(user?.facebookUrl || "");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioUrl", portfolioUrl);
    formData.append("linkedInUrl", linkedInUrl);
    formData.append("githubUrl", githubUrl);
    formData.append("instagramUrl", instagramUrl);
    formData.append("twitterUrl", twitterUrl);
    formData.append("facebookUrl", facebookUrl);
    if (avatar) formData.append("avatar", avatar);
    if (resume) formData.append("resume", resume);

    dispatch(updateProfile(formData))
      .then((result) => {
        if (updateProfile.fulfilled.match(result)) {
          toast.success("Profile updated successfully !");
        } else if (updateProfile.rejected.match(result)) {
          const errorMessage =
            result.payload || "Something went wrong. Please try again.";
          toast.error(errorMessage);
        }
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.";
        toast.error(errorMessage);
      });
  };

  useEffect(() => {
    setFullName(user?.fullName || "");
    setEmail(user?.email || "");
    setPhoneNumber(user?.phoneNumber || "");
    setAboutMe(user?.aboutMe || "");
    setPortfolioUrl(user?.portfolioUrl || "");
    setLinkedInUrl(user?.linkedInUrl || "");
    setGithubUrl(user?.githubUrl || "");
    setInstagramUrl(user?.instagramUrl || "");
    setTwitterUrl(user?.twitterUrl || "");
    setFacebookUrl(user?.facebookUrl || "");
    setAvatarPreview(user?.avatar?.url || "");
    setResumePreview(user?.resume?.url || "");
  }, [user]);

  return (
    <div className="w-full h-full p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Update Profile</h1>
            <p className="text-muted-foreground">Update Your Profile Here</p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2 w-full sm:w-1/2 lg:w-1/3">
                <Label>Profile Image</Label>
                <img
                  src={avatarPreview || "/avatarHolder.jpg"}
                  alt="avatar"
                  className="w-full h-auto rounded-2xl"
                />
                <input type="file" onChange={avatarHandler} className="mt-2" />
              </div>
              <div className="grid gap-2 w-full sm:w-1/2 lg:w-1/3">
                <Label>Resume</Label>
                <Link to={resumePreview || "#"} target="_blank">
                  <img
                    src={resumePreview || "/avatarHolder.jpg"}
                    alt="resume"
                    className="w-full h-auto rounded-2xl"
                  />
                </Link>
                <input type="file" onChange={resumeHandler} className="mt-2" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Portfolio URL</Label>
                <Input
                  type="text"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input
                  type="text"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input
                  type="text"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Twitter(X) URL</Label>
                <Input
                  type="text"
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Facebook URL</Label>
                <Input
                  type="text"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleUpdateProfile} className="w-full">
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
