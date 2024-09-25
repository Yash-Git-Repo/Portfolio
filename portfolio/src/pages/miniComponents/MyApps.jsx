import { Card } from "@/components/ui/card";
import { axiosClient } from "@/utils/axiosClient";
import React, { useEffect, useState } from "react";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const getMyApps = async () => {
      const response = await axiosClient.get(
        "softwareApplication/getAllSoftwareApplication"
      );
      setApps(response?.data?.result);
    };
    getMyApps();
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-4" >
      {/* Centered Title */}
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text text-center mb-8" style={{"margin-left":"600px"}}>
        MY APPS
      </h1>

      {/* Centered Grid */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {apps &&
          apps.map((element) => {
            return (
              <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3" key={element._id}>
                <img
                  src={element.icon && element.icon.url}
                  alt="app-icon"
                  className="h-12 sm:h-24 w-auto"
                />
                <p className="text-muted-foreground text-center">
                  {element.name}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default MyApps;
