import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import MacBrowser from "./MacBrowser";
import { useParallax } from "@/hooks/useParallax";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Hero: React.FC = () => {
  const offset = useParallax(0.2);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center px-4 py-24 overflow-hidden"
      style={{
        backgroundColor: "#0f172a",
        backgroundImage: `
          radial-gradient(at calc(70% + ${offset * 0.5}px) calc(0% + ${offset * 0.3}px), hsla(210, 100%, 65%, 0.3) 0px, transparent 50%),
          radial-gradient(at calc(30% - ${offset * 0.3}px) calc(100% - ${offset * 0.2}px), hsla(270, 100%, 65%, 0.2) 0px, transparent 50%)
        `,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="max-w-7xl mx-auto text-center z-10 animate-fade-in">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600/30 to-indigo-600/30 px-5 py-2.5 border border-blue-500/30 backdrop-blur-sm">
          <span className="text-sm font-medium tracking-wide bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
            Coming Soon — Join the Waitlist
          </span>
        </div>
        {/* Headline */}
        <div className="max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl md:text-[3.75rem] font-semibold text-white leading-tight md:leading-[1.1]">
            <div className="relative pl-6 md:pl-10">
              <span className="absolute left-0 top-0 bottom-0  w-[2.5px] bg-gradient-to-b from-blue-400/80 to-transparent" />
              <div className="flex flex-col gap-y-3 text-left">
                <span className="text-gray-200 font-medium tracking-tight">
                  Smarter Video Ads,
                </span>
                <span className="text-white font-bold pb-1">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                    {" "}
                    Higher Conversions.
                  </span>
                </span>
              </div>
            </div>
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-2 leading-relaxed">
          Grow Your Brand & Social Media with Production-Ready Video Ads.
          <span className="hidden md:inline"> Powered by Agentic AI.</span>
        </p>
      </div>

      <div className="mt-10 w-full max-w-[60rem] mx-auto px-4">
        {" "}
        <MacBrowser />
      </div>
    </section>
  );
};

export default Hero;
