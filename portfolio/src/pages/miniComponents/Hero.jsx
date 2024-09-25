import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import { axiosClient } from "@/utils/axiosClient";

const Hero = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getMyProfile = async () => {
      const response = await axiosClient.get("user/getUserForPortfolio");
      setUser(response?.data?.result);
    };
    getMyProfile();
  }, []);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 ">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>
      <h1 className="text-[1.3rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
        Hey, I'm Yash
      </h1>

      <h1
        className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
      sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]"
      >
        <Typewriter
          words={["FULLSTACK DEVELOPER"]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <div className="flex gap-2">
        <div className="w-fit px-5 py-2 bg-slate-50 rounded-[15px] flex items-center mt-4 md:mt-8 lg:mt-10">
          <Link to={user?.linkedInUrl} target="_blank">
            <Linkedin className="text-sky-500 w-7 h-7" />
          </Link>
        </div>
        <div className="w-fit px-5 py-2 bg-slate-50 rounded-[15px] flex items-center  mt-4 md:mt-8 lg:mt-10">
          <Link to={user?.githubUrl} target="_blank">
            <Github className="text-sky-500 w-7 h-7" />
          </Link>
        </div>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10  flex gap-3">
        <Link to={user?.githubUrl} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Github />
            </span>
            <span>Github</span>
          </Button>
        </Link>
        <Link to={user?.resume && user?.resume?.url} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <ExternalLink />
            </span>
            <span>Resume </span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xl tracking-[2px]">{user?.aboutMe}</p>
    </div>
  );
};

export default Hero;
