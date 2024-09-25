import { axiosClient } from "@/utils/axiosClient";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const getMyTimeline = async () => {
      const response = await axiosClient.get("timeline/getAllTimeline");
      setTimeline(response?.data?.result);
    };
    getMyTimeline();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8">
        Timeline
      </h1>
      <ol className="relative border-l border-gray-500 dark:border-gray-700">
        {timeline &&
          timeline.map((element) => {
            return (
              <li className="mb-12 ml-8" key={element._id}>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full -left-3 ring-8 ring-gray-900">
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h3 className="mb-1 text-lg font-semibold">
                  {element.title}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none ">
                  {element.timeline.from} -{" "}
                  {element.timeline.to ? element.timeline.to : "Present"}
                </time>
                <p className="text-base font-normal">
                  {element.description}
                </p>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default Timeline;
