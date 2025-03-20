import { useState, useEffect, useRef } from "react";
import {
  Rocket,
  BrainCircuit,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  BarChart,
  Users,
  BookOpen,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function TaskDashboard() {
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [insightsGenerated, setInsightsGenerated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleGenerateInsights = () => {
    setInsightsLoading(true);
    setShowInsights(false);
    setInsightsGenerated(true);

    setTimeout(() => {
      setInsightsLoading(false);
      setShowInsights(true);
    }, 2000);
  };

  const aiInsights = {
    averageScore: 78,
    averageTime: "6hrs, 27minutes",
    focus:
      "understanding living and non-living things, specifically the MRS C GREN criteria, and how to classify organisms and objects.",
    strengths: [
      "Identifying living and non-living things",
      "Understanding life processes",
      "Grasping basic life processes",
    ],
    developmentAreas: [
      "Distinguishing subtle cases",
      "Applying MRS C GREN systematically",
      "Explaining reasoning",
    ],
    strugglingStudents: ["first7", "first8", "first9", "first10"],
    strugglingAreas: ["Living/Non-living?", "MRS C GREN"],
    overallRecommendation:
      "Focus on applying MRS C GREN criteria and identifying life processes.",
  };

  const insightVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.7 } },
  };

  const progressVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.5, ease: "easeInOut" },
    },
  };

  const lessonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.8, ease: "easeInOut" },
    },
  };

  // Helper function for animated value display
  const AnimatedValue = ({
    value,
    unit = "",
  }: {
    value: number;
    unit?: string;
  }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      const animationDuration = 1500; // Adjust as needed
      const frameRate = 60;
      const increment = value / (animationDuration / (1000 / frameRate));
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          clearInterval(interval);
          setDisplayValue(value);
        } else {
          setDisplayValue(Math.round(current));
        }
      }, 1000 / frameRate);

      return () => clearInterval(interval);
    }, [value]);

    return (
      <span className="font-bold text-3xl text-blue-700">
        {displayValue}
        {unit}
      </span>
    );
  };

  const getIcon = (section: string) => {
    switch (section) {
      case "strengths":
        return <Sparkles className="w-6 h-6 text-green-500" />;
      case "developmentAreas":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case "strugglingStudents":
        return <Users className="w-6 h-6 text-red-500" />;
      case "overallRecommendation":
        return <Rocket className="w-6 h-6 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen" ref={containerRef}>
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <a href="#" className="text-blue-600 hover:underline text-sm">
            ← Back to all Tasks
          </a>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>

        {/* Task Title and Due Date */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            The Rizzlers - Living and Non-Living
          </h2>
          <p className="text-gray-600">Due 27 Mar, 11:00 am</p>

          {/* Navigation Tabs */}
          <div className="mt-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <a
                href="#"
                className="border-b-2 border-blue-500 text-blue-500 py-4 px-1 text-sm font-medium whitespace-nowrap"
              >
                Details
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium whitespace-nowrap"
              >
                Monitor
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium whitespace-nowrap"
              >
                Responses
              </a>
              <a
                href="#"
                className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium whitespace-nowrap"
              >
                Report
              </a>
            </nav>
          </div>

          {/* Last Updated and Assess Button */}
          <div className="mt-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Last updated today at 17:00{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Update
                </a>
              </p>
            </div>
            <button className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm">
              A Assess students on this content
            </button>
          </div>

          {/* Generate Insights Button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleGenerateInsights}
              disabled={insightsLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            >
              {insightsLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating Insights...
                </>
              ) : (
                <>
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Generate AI Insights
                </>
              )}
            </Button>
          </div>

          {/* AI Insights Section */}
          <AnimatePresence>
            {showInsights && (
              <motion.div
                variants={insightVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-8 rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <Card className="bg-gradient-to-r from-blue-100 to-purple-100">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center">
                      <BrainCircuit className="w-10 h-10 text-blue-600 mr-4" />
                      <CardTitle className="text-3xl font-bold text-gray-800">
                        AI-Generated Insights
                      </CardTitle>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 justify-between">
                      <div>
                        <div className="text-gray-700 text-lg flex items-center gap-2">
                          <BookOpen className="w-5 h-5" />
                          <span>Average Score:</span>
                          <AnimatedValue
                            value={aiInsights.averageScore}
                            unit="%"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-700 text-lg flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          <span>Average Time:</span>
                          <span className="font-bold text-3xl text-blue-700">
                            {aiInsights.averageTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-700 text-sm">
                      Task Focus:{" "}
                      <span className="font-medium">{aiInsights.focus}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Strengths Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          {getIcon("strengths")}
                          <h4 className="text-xl font-semibold text-green-600">
                            Strengths
                          </h4>
                        </div>

                        <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                          {aiInsights.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Development Areas Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          {getIcon("developmentAreas")}
                          <h4 className="text-xl font-semibold text-yellow-600">
                            Development Areas
                          </h4>
                        </div>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                          {aiInsights.developmentAreas.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Struggling Students Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          {getIcon("strugglingStudents")}
                          <h4 className="text-xl font-semibold text-red-600">
                            Students Who Need Help
                          </h4>
                        </div>

                        <div className="text-gray-700 space-y-2">
                          <p className="text-lg">
                            Students ({aiInsights.strugglingStudents.join(", ")}
                            ) struggled.
                          </p>
                          <p className="text-lg">
                            They struggled with:{" "}
                            <span className="font-medium">
                              {aiInsights.strugglingAreas.join(" and ")}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Overall Recommendation Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          {getIcon("overallRecommendation")}
                          <h4 className="text-xl font-semibold text-purple-600">
                            Overall Recommendation
                          </h4>
                        </div>

                        <p className="text-gray-700 text-lg">
                          {aiInsights.overallRecommendation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Overview */}
          <motion.div
            variants={progressVariants}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
              <BarChart className="w-7 h-7" />
              Progress Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-100 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 shadow-md border border-blue-200">
                <p className="text-3xl font-bold text-white">10</p>
                <p className="text-lg text-gray-700">ASSIGNED</p>
              </div>
              <div className="bg-red-100 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 shadow-md border border-red-200">
                <p className="text-3xl font-bold text-white">1</p>
                <p className="text-lg text-gray-700">NOT STARTED</p>
              </div>
              <div className="bg-yellow-100 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 shadow-md border border-yellow-200">
                <p className="text-3xl font-bold text-white">4</p>
                <p className="text-lg text-gray-700">IN PROGRESS</p>
              </div>
              <div className="bg-green-100 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 shadow-md border border-green-200">
                <p className="text-3xl font-bold text-white">5</p>
                <p className="text-lg text-gray-700">FINISHED</p>
              </div>
            </div>
          </motion.div>

          {/* Lesson Progress Table */}
          <motion.div
            variants={lessonVariants}
            initial="hidden"
            animate="visible"
            className="mt-10"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Lesson Progress
            </h3>
            <div className="rounded-xl shadow-md overflow-hidden border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lesson
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Average Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Average Accuracy
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Students Complete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      1. Living and Non-living Things
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      6 min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">63%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-32 mr-3">
                          <Progress value={78} className="h-3" />
                        </div>
                        <span className="text-lg">78%</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      2. Environments
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      2 min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">64%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-32 mr-3">
                          <Progress value={71} className="h-3" />
                        </div>
                        <span className="text-lg">71%</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      3. Plants and their Environment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      3 min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">63%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-32 mr-3">
                          <Progress value={75} className="h-3" />
                        </div>
                        <span className="text-lg">75%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default TaskDashboard;
