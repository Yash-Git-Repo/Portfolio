import React from "react";

const About = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 md:px-8 lg:px-16 overflow-x-hidden">
      {/* Heading Section */}
      <div className="relative text-center mb-8">
      <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
      </div>

      {/* Subheading */}
      <div className="text-center mb-8">
        <p className="uppercase text-lg sm:text-xl text-gray-400">
          Allow me to introduce myself.
        </p>
      </div>

      {/* Content Section */}
      <div className="w-full grid md:grid-cols-2 gap-14 mb-10">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src="/me.jpg"
            alt="avatar"
            className="bg-white p-2 sm:p-4 rotate-[10deg] transform transition-all duration-300 hover:rotate-0 h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px] rounded-md shadow-lg"
          />
        </div>

        {/* Text Content Section */}
        <div className="flex flex-col justify-center gap-5 text-lg sm:text-xl leading-relaxed tracking-wide text-gray-200">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor vel
            quas laborum voluptates adipisci itaque quos qui temporibus vero
            doloribus, neque id dicta ipsam placeat a nam odit beatae voluptate.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
            nostrum. Aspernatur dolores hic at, minus odit ducimus beatae omnis
            dolore.
          </p>
        </div>
      </div>

      {/* Closing Statement */}
      <p className="text-lg sm:text-xl tracking-wide text-gray-300 text-center">
        My dedication and perseverance in timely delivery of work are integral
        to me. I maintain the courage to face any challenges for extended
        periods.
      </p>
    </div>
  );
};

export default About;
