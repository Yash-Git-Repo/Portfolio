import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { axiosClient } from "@/utils/axiosClient";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");

  const { projectId } = useParams();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axiosClient.get(
          `/projects/getSingleProject/${projectId}`
        );
        const project = res?.data?.result;

        setTitle(project?.title || "Untitled Project");
        setDescription(project?.description || "No description provided.");
        setStack(project?.stack || "No stack specified.");
        setDeployed(project?.deployed || "Not deployed.");
        setTechnologies(project?.technologies || "No technologies specified.");
        setGitRepoLink(project?.gitRepoLink || "#");
        setProjectLink(project?.projectLink || "#");
        setProjectBanner(project?.projectBanner?.url || "/avatarHolder.jpg");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project.");
      }
    };

    getProject();
  }, [projectId]);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 bg-muted/40 w-[99vw]">
      <div className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-end">
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <img
                  src={projectBanner}
                  alt={`${title} Banner`}
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Description:</p>
                <ul className="list-disc">
                  {descriptionList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Technologies:</p>
                <ul className="list-disc">
                  {technologiesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Stack:</p>
                <p>{stack}</p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Deployed:</p>
                <p>{deployed}</p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Github Repository Link:</p>
                <Link
                  className="text-sky-700"
                  target="_blank"
                  to={gitRepoLink.startsWith("http") ? gitRepoLink : "#"}
                >
                  {gitRepoLink !== "#" ? gitRepoLink : "No repository available"}
                </Link>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Project Link:</p>
                <Link
                  className="text-sky-700"
                  target="_blank"
                  to={projectLink.startsWith("http") ? projectLink : "#"}
                >
                  {projectLink !== "#" ? projectLink : "No project link available"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
