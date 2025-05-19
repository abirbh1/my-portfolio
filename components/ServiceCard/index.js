import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ServiceCard = ({ name, description }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={`w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
        mounted && theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50"
      } hover:scale-105 link`}
    >
      <h1 className="text-3xl">{name ? name : "Heading"}</h1>
      <p className="mt-5 opacity-40 text-xl">
        {description
          ? description
          : "I am a PhD student at Université Laval (FSA), specializing in auction-based procurement for truckload transportation services. My background is in computer science and intelligent systems. I earned both an engineering degree and a research-based master’s in Tunisia, where I discovered my passion for using AI to solve real-world problems—especially in recommendation systems and customer profiling. At FSA, I am working with the CIRRELT lab, combining artificial intelligence and optimization to improve how carriers bid for transportation contracts. My goal is to apply my skills to create smart, practical solutions for complex logistics and decision-making challenges in the real world. "}
      </p>
    </div>
  );
};

export default ServiceCard;
