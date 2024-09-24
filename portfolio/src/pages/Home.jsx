import React from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import About from "./miniComponents/About";
import Skills from "./miniComponents/Skills";
import Portfolio from "./miniComponents/Portfolio";
import MyApps from "./miniComponents/MyApps";
import Contact from "./miniComponents/Contact";

const Home = () => {
  return (
    <div
      className="flex items-start justify-center min-h-screen bg-background"
      style={{ "margin-left": "150px" }}
    >
      <article className="px-5 mt-5 sm:mt-7 md:mt-8 lg:mt-24 xl:mt-16 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-12 sm:gap-14">
        <Hero />
        <hr className="my-8 md::my-10 " />

        <Timeline />
        <hr className="my-8 md::my-10 " />

        <About />
        <hr className="my-8 md::my-10 " />

        <Skills />
        <hr className="my-8 md::my-10 " />

        <Portfolio />
        <hr className="my-8 md::my-10 " />

        <MyApps />
        <hr className="my-8 md::my-10 " />

        <Contact />
        <hr className="my-8 md::my-10 " />
      </article>
    </div>
  );
};

export default Home;
