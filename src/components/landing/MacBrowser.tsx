import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Sample data for different time periods
const timePeriodData = {
  "1D": {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    impressions: [
      250, 180, 150, 140, 170, 350, 850, 1800, 2800, 3500, 4500, 5500, 6000,
      5800, 5400, 5000, 6000, 7800, 8800, 8500, 6800, 4800, 2800, 1500,
    ],
    clicks: [
      18, 12, 10, 8, 15, 45, 150, 350, 550, 680, 880, 1080, 1180, 1120, 1020,
      920, 1150, 1450, 1800, 1650, 1250, 850, 480, 220,
    ],
    engagements: [
      8, 5, 4, 3, 6, 18, 55, 120, 190, 235, 300, 360, 400, 380, 340, 300, 380,
      480, 600, 550, 400, 270, 140, 65,
    ],
    viewRate: Array.from(
      { length: 24 },
      (_, i) => (6.5 + Math.sin(i / 3) * 1.2).toFixed(1) + "%"
    ),
    ctr: Array.from(
      { length: 24 },
      (_, i) => (3.2 + Math.cos(i / 4) * 0.7).toFixed(1) + "%"
    ),
  },
  "1W": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    impressions: [18000, 22000, 19000, 18500, 32000, 42500, 43000],
    clicks: [1200, 1250, 1350, 1300, 1400, 1250, 1350],
    engagements: [500, 520, 560, 540, 580, 520, 560],
    completionRate: ["85%", "86%", "88%", "87%", "89%", "87%", "88%"],
    dropOffRate: ["15%", "14%", "12%", "13%", "11%", "13%", "12%"],
  },
  "1M": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    impressions: [85000, 115000, 125000, 170000],
    clicks: [4500, 5000, 5500, 6300],
    engagements: [1800, 2000, 2200, 2520],
    avgViewDuration: ["0:55", "1:02", "1:08", "1:15"],
    conversionRate: ["3.2%", "3.5%", "3.8%", "4.2%"],
  },
};

const randomizeData = [
  3, 7, 1, 4, 9, 0, 5, 2, 8, 6, 4, 1, 7, 3, 9, 2, 5, 0, 8, 6, 2, 9, 4, 7, 1, 5,
  3, 0, 8, 6, 5, 2, 9, 1, 7, 4, 0, 3, 8, 6, 0, 5, 2, 9, 7, 1, 4, 3, 8, 6, 2, 9,
  4, 7, 1, 5, 3, 0, 8, 6, 5, 2, 9, 1, 7, 4, 0, 3, 8, 6, 3, 7, 1, 4, 9, 0, 5, 2,
  8, 6, 4, 1, 7, 3, 9, 2, 5, 0, 8, 6,
];

const AnimatedCounter = ({
  value,
  isPercentage = false,
}: {
  value: number;
  isPercentage?: boolean;
}) => {
  const [displayedValue, setDisplayedValue] = useState<string>("");
  const animationRef = useRef<NodeJS.Timeout[]>([]);
  const dataIndexRef = useRef(0);

  useEffect(() => {
    // Clear any existing animations
    animationRef.current.forEach((id) => clearTimeout(id));
    animationRef.current = [];
    dataIndexRef.current = 0;

    const valueStr = isPercentage
      ? `${value.toFixed(1)}%`
      : Math.round(value).toLocaleString();

    setDisplayedValue("");

    const chars = valueStr.split("");

    chars.forEach((char, index) => {
      const isDigit = !isNaN(parseInt(char));
      const timeoutId = setTimeout(() => {
        let intervalCount = 0;
        const intervalDuration = 80;
        const totalDuration = 1000;

        const intervalId = setInterval(() => {
          setDisplayedValue((prev) => {
            const newChars = prev.split("");

            while (newChars.length <= index) {
              newChars.push("");
            }

            if (isDigit) {
              const digit =
                randomizeData[dataIndexRef.current % randomizeData.length];
              newChars[index] = digit.toString();
              dataIndexRef.current++;
            } else {
              newChars[index] = char;
            }

            return newChars.join("");
          });

          intervalCount++;

          if (intervalCount * intervalDuration >= totalDuration) {
            clearInterval(intervalId);
            setDisplayedValue((prev) => {
              const newChars = prev.split("");
              while (newChars.length <= index) {
                newChars.push("");
              }
              newChars[index] = char;
              return newChars.join("");
            });
          }
        }, intervalDuration);

        animationRef.current.push(intervalId);
      }, index * 300);

      animationRef.current.push(timeoutId);
    });

    return () => {
      animationRef.current.forEach((id) => clearTimeout(id));
    };
  }, [value, isPercentage]);

  return (
    <div className="flex">
      {displayedValue.split("").map((char, index) => (
        <span key={index} className="text-white">
          {char || "\u00A0"} {/* &nbsp; for empty characters */}
        </span>
      ))}
    </div>
  );
};

const MacBrowser = () => {
  const [activePeriod, setActivePeriod] = useState<"1D" | "1W" | "1M">("1D");
  const currentData = timePeriodData[activePeriod];

  const totalImpressions = currentData.impressions.reduce((a, b) => a + b, 0);
  const totalClicks = currentData.clicks.reduce((a, b) => a + b, 0);
  const totalEngagements = currentData.engagements.reduce((a, b) => a + b, 0);
  const ctr = (totalClicks / totalImpressions) * 100;
  const engagementRate = (totalEngagements / totalImpressions) * 100;

  const [metricsRef, metricsInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const chartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Impressions",
        data: currentData.impressions,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        tension: 0.1,
        fill: true,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Clicks",
        data: currentData.clicks,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.05)",
        tension: 0.1,
        fill: true,
        pointBackgroundColor: "#8b5cf6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Engagements",
        data: currentData.engagements,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.05)",
        tension: 0.1,
        fill: true,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false, // Static legend removed
      },
      title: {
        display: true,
        text: "DASHBOARD",
        color: "#ffffff",
        font: {
          size: 18,
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
        align: "center" as const,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#e2e8f0",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          labelColor: (context: any) => {
            return {
              borderColor: "transparent",
              backgroundColor: context.dataset.borderColor,
              borderRadius: 6,
            };
          },
          label: (context: any) => {
            return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
          font: {
            size: 11,
          },
        },
        border: {
          color: "rgba(255, 255, 255, 0.05)",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.03)",
          drawTicks: false,
        },
        ticks: {
          color: "#94a3b8",
          padding: 8,
          font: {
            size: 10,
          },
          callback: (value: any) => value.toLocaleString(),
          count: 3,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full flex justify-center px-0 sm:px-4">
      <div className="w-[95vw] max-w-[70rem]">
        <div className="mac-mockup rounded-xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-950 backdrop-blur-sm">
          {/* Browser Chrome */}
          <div className="browser-chrome bg-gray-900/80 border-b border-gray-800/50 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center px-4 py-3">
              <div className="flex items-center w-full sm:w-auto">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex-1 bg-gray-800/60 rounded-md px-3 py-1.5 text-xs text-gray-400 font-mono truncate">
                  dashboard.theviroai.com
                </div>
              </div>

              {/* Time period selector - now always visible */}
              <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-3 sm:mt-0">
                <div className="flex space-x-2">
                  {(["1D", "1W", "1M"] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setActivePeriod(period)}
                      className={`px-3 py-1.5 text-xs rounded transition-all min-w-[50px] ${
                        activePeriod === period
                          ? "text-white bg-blue-500/20 border border-blue-500/30"
                          : "text-gray-400 bg-gray-800/50 hover:bg-gray-700/50"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Browser Content */}
          <div className="browser-content bg-gradient-to-b from-gray-900 to-gray-950 p-4 sm:p-6">
            {/* Chart - shorter on mobile */}
            <div className="h-64 sm:h-80 w-full relative">
              <Line data={chartData} options={chartOptions} />
            </div>

            {/* Metrics Grid - optimized for mobile */}
            <div
              ref={metricsRef}
              className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8"
            >
              {/* Row 1 */}
              <div className="bg-gray-800/30 p-3 sm:p-4 rounded-xl border border-gray-700/50">
                <div className="text-gray-400 text-xs sm:text-sm mb-1">
                  Total Impressions
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {metricsInView ? (
                    <AnimatedCounter value={totalImpressions} />
                  ) : (
                    "0"
                  )}
                </div>
                <div className="text-blue-400 text-xs mt-1">
                  Potential reach
                </div>
              </div>

              <div className="bg-gray-800/30 p-3 sm:p-4 rounded-xl border border-gray-700/50">
                <div className="text-gray-400 text-xs sm:text-sm mb-1">
                  Total Clicks
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {metricsInView ? (
                    <AnimatedCounter value={totalClicks} />
                  ) : (
                    "0"
                  )}
                </div>
                <div className="text-purple-400 text-xs mt-1">
                  Visitors to site
                </div>
              </div>

              {/* Row 2 */}
              <div className="bg-gray-800/30 p-3 sm:p-4 rounded-xl border border-gray-700/50">
                <div className="text-gray-400 text-xs sm:text-sm mb-1">
                  Engagement Rate
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {metricsInView ? (
                    <AnimatedCounter value={engagementRate} isPercentage />
                  ) : (
                    "0%"
                  )}
                </div>
                <div className="text-green-400 text-xs mt-1">
                  Audience interaction
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 p-3 sm:p-4 rounded-xl border border-blue-800/30">
                <div className="text-blue-300 text-xs sm:text-sm mb-1">
                  Click-Through Rate
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {metricsInView ? (
                    <AnimatedCounter value={ctr} isPercentage />
                  ) : (
                    "0%"
                  )}
                </div>
                <div className="text-blue-400 text-xs mt-1">
                  Views to clicks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacBrowser;
