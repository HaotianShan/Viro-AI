import {
  FiDatabase,
  FiZap,
  FiFilm,
  FiEdit3,
  FiVideo,
  FiArrowRight,
  FiPlay,
  FiArrowDown,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const AgentSystemVisualization = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showVideoVisualizations, setShowVideoVisualizations] = useState(false);
  const animationRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const productDescription =
    "Sleek, water-resistant backpack with ergonomic straps and multiple compartments. Made from durable recycled materials.";

  const agents = [
    {
      id: 1,
      name: "Brainstormer",
      icon: FiZap,
      description: "Generates creative concepts and ad ideas",
    },
    {
      id: 2,
      name: "Director",
      icon: FiFilm,
      description: "Structures visual narrative and shot sequence",
    },
    {
      id: 3,
      name: "Scriptwriter",
      icon: FiEdit3,
      description: "Crafts detailed movements and interactions",
    },
    {
      id: 4,
      name: "Videographer",
      icon: FiVideo,
      description: "Shots the final video",
    },
  ];

  const resetAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startAnimation = () => {
    resetAnimation();

    setAnimationStep(1);

    timeoutRef.current = setTimeout(() => {
      setAnimationStep(2);
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= productDescription.length) {
          setTypedText(productDescription.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setAnimationStep(3);
          timeoutRef.current = setTimeout(() => {
            setAnimationStep(4);
            timeoutRef.current = setTimeout(() => {
              const highlightAgents = (agentIndex: number) => {
                if (agentIndex < agents.length) {
                  setAnimationStep(5 + agentIndex);
                  timeoutRef.current = setTimeout(() => {
                    highlightAgents(agentIndex + 1);
                  }, 1000);
                } else {
                  setAnimationStep(9);
                  timeoutRef.current = setTimeout(() => {
                    setAnimationStep(10);
                    timeoutRef.current = setTimeout(() => {
                      setAnimationStep(11);
                      setShowVideoVisualizations(true);
                    }, 1000);
                  }, 1000);
                }
              };
              highlightAgents(0);
            }, 1000);
          }, 1000);
        }
      }, 30);
    }, 1500);
  };

  useEffect(() => {
    if (inView && !animationStarted) {
      startAnimation();
      setAnimationStarted(true);
    }
  }, [inView, animationStarted]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden bg-[rgba(0,0,0)]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiZap className="h-5 w-5 text-cyan-400" />
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-sm">
              Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How it{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Describe your product. Our AI handles the rest—thinking, planning,
            filming, and even arguing over the perfect background music! You
            just sit back and enjoy the magic.
          </p>
        </div>

        {/* Horizontal Layout for Product Details and AI Agents */}
        <div className="flex flex-col md:flex-row items-stretch gap-8 mb-16">
          {/* Product Details - Left Side */}
          <div
            className={`w-full md:w-2/5 bg-[#121212] rounded-xl p-6 border transition-all duration-500 ${
              animationStep === 1
                ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
                : "border-gray-800"
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center mr-4 border border-gray-800">
                <FiDatabase className="text-cyan-400 text-xl" />
              </div>
              <h2 className="text-xl font-medium text-white">
                Product Details
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-2">Product Name</div>
                <div className="bg-[#1a1a1a] rounded-lg p-4 text-white border border-gray-800">
                  UltraLight Backpack
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">Description</div>
                <div className="bg-[#1a1a1a] rounded-lg p-4 text-gray-300 min-h-32 border border-gray-800">
                  {typedText}
                  {animationStep === 2 && (
                    <span className="ml-1 inline-block w-2 h-5 bg-cyan-400 animate-pulse"></span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Connector */}
          <div className="hidden md:flex items-center justify-center text-gray-600 mx-4">
            <div className="relative h-full flex items-center">
              <div className="absolute top-1/2 left-0 w-12 h-0.5 bg-gray-700"></div>
              <div
                className={`z-10 bg-[#0a0a0a] p-2 rounded-full border transition-all duration-500 ${
                  animationStep === 3
                    ? "border-cyan-500 text-cyan-500 shadow-lg shadow-cyan-500/10"
                    : "border-gray-800"
                }`}
              >
                <FiArrowRight className="text-2xl" />
              </div>
              <div className="absolute top-1/2 right-0 w-12 h-0.5 bg-gray-700"></div>
            </div>
          </div>

          {/* AI Agents - Right Side */}
          <div
            className={`w-full md:w-3/5 bg-[#121212] rounded-xl p-6 border transition-all duration-500 ${
              animationStep >= 4 && animationStep < 9
                ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
                : "border-gray-800"
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center mr-4 border border-gray-800">
                <FiZap className="text-cyan-400 text-xl" />
              </div>
              <h2 className="text-xl font-medium text-white">AI Agents</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`bg-[#1a1a1a] border rounded-lg p-5 transition-all duration-500 ${
                    animationStep >= 5 + agent.id - 1 && animationStep < 9
                      ? "border-cyan-500 shadow-lg shadow-cyan-500/10"
                      : "border-gray-800"
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] flex items-center justify-center mr-3 border border-gray-800">
                      <agent.icon className="text-cyan-400 text-lg" />
                    </div>
                    <h3 className="font-medium text-white">{agent.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{agent.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Output Section */}
        <div className="flex flex-col items-center py-2 px-4 max-w-6xl mx-auto">
          {/* Down Arrow */}
          <div className="flex justify-center text-gray-600 mb-8">
            <div className="relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-gray-700 to-transparent"></div>
              <div
                className={`relative z-10 bg-[#0a0a0a] p-3 rounded-full border-2 transition-all duration-500 ${
                  animationStep >= 10
                    ? "border-cyan-500 text-cyan-500 shadow-lg shadow-cyan-500/20"
                    : "border-gray-800"
                }`}
              >
                <FiArrowDown className="text-xl" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Final Video Output
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              See the results generated by our AI agent collaboration system
            </p>
          </div>

          <div className="w-full mx-auto">
            <div className="mb-16">
              <div className="flex items-center justify-center"></div>
              <div className="relative w-full max-w-2xl mx-auto">
                <div className="relative grid grid-cols-3 grid-rows-3 gap-6 aspect-square">
                  {/* Video Generating Placeholder */}
                  {!showVideoVisualizations && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Abstract blurry shapes */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            {/* Animated gradient circle */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-48 h-48 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-2xl animate-pulse"></div>
                            </div>

                            {/* Floating circles */}
                            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-cyan-500/10 blur-xl animate-float"></div>
                            <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-blue-500/10 blur-xl animate-float animation-delay-1000"></div>
                            <div className="absolute top-12 -right-12 w-16 h-16 rounded-full bg-purple-500/10 blur-xl animate-float animation-delay-2000"></div>

                            {/* Central shimmer effect */}
                            <div className="relative z-10 w-52 h-52 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 flex items-center justify-center shadow-lg">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/50 to-transparent animate-shimmer"></div>
                              <div className="flex flex-col items-center justify-center relative z-10">
                                <svg
                                  className="animate-spin h-8 w-8 text-gray-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                <span className="mt-4 text-gray-400 text-sm">
                                  Generating video...
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Final Video Output */}
                  <div className="col-start-2 row-start-2 flex items-center justify-center">
                    <div
                      className={`transition-all duration-700 transform ${
                        showVideoVisualizations
                          ? "opacity-100 scale-100 rotate-0"
                          : "opacity-0 scale-75 rotate-12"
                      }`}
                    >
                      <div className="relative w-36 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 rounded-xl overflow-hidden shadow-xl shadow-cyan-500/10">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FiPlay className="text-white text-2xl" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 text-center text-xs font-medium text-white">
                          Final Video.mp4
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Clips */}
                  {[0, 1, 2, 3].map((i) => {
                    const positions = [
                      { row: 1, col: 2 }, // Top
                      { row: 2, col: 1 }, // Left
                      { row: 2, col: 3 }, // Right
                      { row: 3, col: 2 }, // Bottom
                    ];

                    const { row, col } = positions[i];

                    return (
                      <div
                        key={i}
                        className={`col-start-${col} row-start-${row} flex items-center justify-center transition-all duration-700 ${
                          showVideoVisualizations
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-50"
                        }`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        <div className="relative w-24 h-16 bg-gradient-to-b from-[#0f172a] to-[#111827] border border-gray-700 rounded-lg overflow-hidden shadow-lg">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FiVideo className="text-cyan-400 text-base" />
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-1 text-center text-[10px] text-gray-300 font-medium">
                            clip-{i + 1}.mp4
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Connecting lines */}
                  {showVideoVisualizations && (
                    <>
                      {/* Top */}
                      <div className="absolute top-1/4 left-1/2 w-0.5 h-1/4 bg-gradient-to-b from-cyan-500/30 to-transparent transform -translate-x-1/2"></div>
                      {/* Left */}
                      <div className="absolute top-1/2 left-1/4 w-1/4 h-0.5 bg-gradient-to-r from-cyan-500/30 to-transparent transform -translate-y-1/2"></div>
                      {/* Right */}
                      <div className="absolute top-1/2 left-1/2 w-1/4 h-0.5 bg-gradient-to-l from-cyan-500/30 to-transparent transform -translate-y-1/2"></div>
                      {/* Bottom */}
                      <div className="absolute top-1/2 left-1/2 w-0.5 h-1/4 bg-gradient-to-t from-cyan-500/30 to-transparent transform -translate-x-1/2"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSystemVisualization;
