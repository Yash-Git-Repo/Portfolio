import { Button } from "@/components/ui/button";
import { axiosClient } from "@/utils/axiosClient";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const response = await axiosClient.get(
        "projects/getAllProjects",
        { withCredentials: true }
      );
      setProjects(response?.data?.result);
    };
    getMyProjects();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Centered Title */}
      <div className="relative mb-12 text-center">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">
            PORTFOLIO
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
      </div>

      {/* Centered Portfolio Grid */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
          {viewAll
            ? projects &&
              projects.map((element) => (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                    className="w-full"
                  />
                </Link>
              ))
            : projects &&
              projects.slice(0, 9).map((element) => (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                    className="w-full"
                  />
                </Link>
              ))}
        </div>
      </div>

      {/* Show More / Show Less Button */}
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
