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
            src="/Yash.jpg"
            alt="avatar"
            className="bg-white p-2 sm:p-4 rotate-[10deg] transform transition-all duration-300 hover:rotate-0 h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px] rounded-md shadow-lg"
          />
        </div>

        {/* Text Content Section */}
        <div className="flex flex-col justify-center gap-5 text-lg sm:text-xl leading-relaxed tracking-wide">
          <p>
            Hello! I'm Yash Shivhare, a passionate and dedicated software
            engineer with a strong foundation in full-stack development. I hold
            a Bachelor of Technology (B.Tech) degree in Electronics Engineering
            from Shri Ramdeobaba College of Engineering and Management, where I
            discovered my love for coding and technology. With over three years
            of professional experience at Capgemini, I have honed my skills in
            building high-performance web applications using technologies like
            React.js, Redux, and Node.js. My work has spanned various sectors,
            including government and finance, where I have successfully led
            projects that prioritize user experience and efficient data
            management.
          </p>
          <p>
            I thrive on solving complex problems and continuously seek to
            enhance both frontend and backend systems to drive business success.
            Beyond coding, I am a strong advocate for collaboration and
            communication, believing that great software is built by great
            teams. In my free time, I enjoy exploring new technologies, working
            on personal projects, and staying updated with industry trends. I'm
            always eager to learn and take on new challenges that push my limits
            and expand my knowledge.My dedication and perseverance in timely
            delivery of work are integral to me. I maintain the courage to face
            any challenges for extended periods.
          </p>
        </div>
      </div>

      {/* Closing Statement */}
      <p className="text-lg sm:text-xl tracking-wide text-center">
        Thank you for visiting my website! Feel free to reach out if you'd like
        to connect or discuss potential opportunities.
      </p>
    </div>
  );
};

export default About;
