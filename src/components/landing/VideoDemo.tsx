import React, { useEffect, useRef, useState } from "react";
import { FaChartLine, FaRobot, FaHashtag } from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";
import { useScrollContext } from "@/lib/scroll-context";

const VideoDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const [isMobile, setIsMobile] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const isAutoScrolling = useRef(false);
  const scrollAnimationId = useRef<number | null>(null);
  const { disableAutoScroll } = useScrollContext();

  const features = [
    {
      icon: <FaChartLine className="w-8 h-8 md:w-12 md:h-12 text-blue-400" />,
      title: "One Dashboard",
      description: "View videos & manage campaigns in one place.",
    },
    {
      icon: <FaRobot className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />,
      title: "Zero Skills",
      description: "Just tell our AI about your business.",
    },
    {
      icon: <FaHashtag className="w-8 h-8 md:w-12 md:h-12 text-teal-400" />,
      title: "Build Your Brand",
      description: "Create consistent, branded videos.",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle auto-scroll and scroll indicator
  useEffect(() => {
    if (isInView) {
      controls.start("visible");

      // Skip auto-scroll on mobile
      if (!isMobile) {
        startAutoScroll();
      }
    }

    return () => {
      if (scrollAnimationId.current) {
        cancelAnimationFrame(scrollAnimationId.current);
      }
    };
  }, [controls, isInView, isMobile]);

  // Track scroll position of features container
  useEffect(() => {
    const container = featuresContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollEnd =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10;
      setShowScrollIndicator(!scrollEnd);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const startAutoScroll = () => {
    if (disableAutoScroll || isMobile) return;
    if (!containerRef.current || isAutoScrolling.current) return;
    if (scrollAnimationId.current) {
      cancelAnimationFrame(scrollAnimationId.current);
    }

    isAutoScrolling.current = true;
    const targetPosition = containerRef.current.offsetTop;
    window.scrollTo(0, targetPosition);
    isAutoScrolling.current = false;
    scrollAnimationId.current = null;
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full min-h-screen flex flex-col items-center justify-center py-16 md:py-24 lg:py-36 px-4 overflow-hidden relative"
      style={{
        background: `
          radial-gradient(ellipse 100% 40% at top, #111827, #000000),
          #000000
        `,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-full max-w-7xl px-4 sm:px-6">
        {/* Title Section */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-20">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-[3.75rem] font-semibold text-white leading-tight md:leading-[1.1]"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            animate={controls}
          >
            <div className="relative pl-4 sm:pl-6 md:pl-10">
              <motion.span
                className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-blue-400/80 to-transparent"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              />
              <div className="flex flex-col gap-y-2 md:gap-y-3 text-left">
                <motion.span
                  className="text-gray-200 font-medium tracking-tight text-base sm:text-lg"
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  Introducing the world's first
                </motion.span>
                <motion.span
                  className="text-white font-bold"
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.2,
                      },
                    },
                  }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                    Multi-Agent Platform
                  </span>
                </motion.span>
                <motion.span
                  className="text-white font-bold"
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.4,
                      },
                    },
                  }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                    for Video Ads
                  </span>
                </motion.span>
              </div>
            </div>
          </motion.h1>
        </div>

        {/* Feature Cards with Scroll Indicator */}
        <div className="relative w-full mb-8 md:mb-24 lg:mb-32">
          <div
            ref={featuresContainerRef}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-10 w-full overflow-x-auto pb-4 md:overflow-visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 rounded-2xl transition-all duration-300 min-h-[200px] w-[85vw] md:w-auto md:min-h-[320px]"
                style={{
                  background: "linear-gradient(145deg, #0d0d0d, #151515)",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
                }}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.6 + index * 0.2,
                    },
                  },
                }}
                initial="hidden"
                animate={controls}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(100, 200, 255, 0.3)",
                  boxShadow: "0 0 30px rgba(100, 150, 255, 0.3)",
                  transition: { duration: 0.01, ease: "easeOut" },
                }}
              >
                <div className="h-full flex flex-col p-4 md:p-8 lg:p-10">
                  <div className="mx-auto mb-4 mt-4 md:mb-8 md:mt-10">
                    {feature.icon}
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-base leading-relaxed tracking-normal flex-grow">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Conditional Scroll Indicator */}
          {showScrollIndicator && (
            <motion.div
              className="absolute left-[calc(85vw-2.5rem)] md:left-[calc(33.333%+2.5rem)] top-[35%] transform -translate-y-1/2 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoDemo;
