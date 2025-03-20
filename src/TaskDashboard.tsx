import { useState } from "react";
import { AIInsightsSection } from "./components/ui/AIInsightsSection";
import { LessonProgressTable } from "./components/ui/LessonProgressTable";
import { ProgressOverview } from "./components/ui/ProgressOverview";
import { AIInsights, lessonData, progressData } from "./lib/types";

function TaskDashboard() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);

  const generateInsights = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setAiInsights({
        averageScore: 78,
        averageTime: "15 minutes",
        focus: "understanding living and non-living things",
        strengths: [
          "Identifying clearly living things (like cows) and non-living things (like robots)",
          "Understanding that living things need to carry out all life processes",
          "Grasping the basic life processes like movement and nutrition",
        ],
        developmentAreas: [
          "Distinguishing between living and non-living things in less obvious cases (like mold)",
          "Understanding all components of MRS C GREN and applying them systematically",
          "Explaining their reasoning clearly in long-form answers about why something is living/non-living",
        ],
        strugglingStudents: ["first7", "first8", "first9", "first10"],
        strugglingAreas: ['"Living or Non-living?"', '"MRS C GREN"'],
        overallRecommendation:
          "studying content on applying MRS C GREN criteria systematically, providing additional examples and practice in identifying all life processes.",
      });
      setIsGenerating(false);
    }, 2000);
  };

  // Component rendering helpers
  const renderHeader = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
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
  );

  const renderNavTabs = () => (
    <div className="mt-4 border-b border-gray-200 overflow-x-auto">
      <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
        <a
          href="#"
          className="border-b-2 border-blue-500 text-blue-500 py-4 px-1 text-sm font-medium whitespace-nowrap"
        >
          Details
        </a>
        {["Monitor", "Responses", "Report"].map((tab) => (
          <a
            key={tab}
            href="#"
            className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium whitespace-nowrap"
          >
            {tab}
          </a>
        ))}
      </nav>
    </div>
  );

  const renderActionBar = () => (
    <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <p className="text-sm text-gray-500">
          Last updated today at 17:00{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Update
          </a>
        </p>
      </div>
      <button className="w-full sm:w-auto bg-blue-500 text-white rounded-md px-4 py-2 text-sm">
        Assess students on this content
      </button>
    </div>
  );

  return (
    <div className="font-sans min-h-screen max-w-7xl w-full h-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        {renderHeader()}

        {/* Main Content Card */}
        <div className="bg-white p-4 sm:p-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            The Rizzlers - Living and Non-Living
          </h2>
          <p className="text-gray-600 mb-4">Due 27 Mar, 11:00 am</p>

          {/* Navigation Tabs */}
          {renderNavTabs()}

          {/* Action Bar */}
          {renderActionBar()}

          {/* AI Insights Section */}
          <AIInsightsSection
            aiInsights={aiInsights}
            isGenerating={isGenerating}
            onGenerateInsights={generateInsights}
          />

          {/* Progress Overview */}
          <ProgressOverview progressData={progressData} />

          {/* Lesson Progress Table */}
          <LessonProgressTable lessonData={lessonData} />
        </div>
      </div>
    </div>
  );
}

export default TaskDashboard;
