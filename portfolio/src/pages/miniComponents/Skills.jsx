import { Card } from "@/components/ui/card";
import { axiosClient } from "@/utils/axiosClient";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  
  useEffect(() => {
    const getMySkills = async () => {
      const response = await axiosClient.get("skills/getAllSkills");
      setSkills(response?.data?.result);
    };
    getMySkills();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-8 sm:gap-12 px-4 py-10" >
      {/* Centered Title */}
      <h1
        className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
        lg:text-[3.8rem] tracking-[15px] dancing_text text-center" style={{"margin-left":"600px"}}
      >
        SKILLS
      </h1>

      {/* Centered Grid */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills &&
            skills.map((element) => (
              <Card
                className="h-fit p-7 flex flex-col justify-center items-center gap-3"
                key={element._id}
              >
                <img
                  src={element.icon && element.icon.url}
                  alt="skill"
                  className="h-12 sm:h-24 w-auto"
                />
                <p className="text-muted-foreground text-center">
                  {element.title}
                </p>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
