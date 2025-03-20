import { useState, useRef, useEffect } from "react";
import {
  BrainCircuit,
  Sparkles,
  AlertTriangle,
  Clock,
  Target,
  Users,
  TrendingUp,
  Loader2,
  ChevronDown,
  ChevronUp,
  Rocket,
} from "lucide-react";
import { MetricCard } from "./MetricCard";
import { InsightCard } from "./InsightCard";
import { AIInsights } from "@/lib/types";

interface AIInsightsSectionProps {
  aiInsights: AIInsights | null;
  isGenerating: boolean;
  onGenerateInsights: () => void;
}

export function AIInsightsSection({
  aiInsights,
  isGenerating,
  onGenerateInsights,
}: AIInsightsSectionProps) {
  const [isInsightsCollapsed, setIsInsightsCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined
  );

  // Effect to measure and update content height when expanded/collapsed
  useEffect(() => {
    if (contentRef.current) {
      if (!isInsightsCollapsed) {
        // Set to auto height when expanded
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        // Trigger animation from current height to zero
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
        setTimeout(() => setContentHeight(0), 10);
      }
    }
  }, [isInsightsCollapsed, aiInsights]);

  const renderInsightsList = (items: string[] = [], bulletColor: string) => (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <div
            className={`w-2 h-2 mt-2 rounded-full ${bulletColor} mr-3`}
          ></div>
          <span className="text-gray-700 text-sm">{item}</span>
        </li>
      ))}
    </ul>
  );

  const renderMetricsSection = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {isGenerating ? (
        // Loading skeleton cards
        <>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse"
            >
              <div className="h-5 w-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </>
      ) : (
        <>
          <MetricCard
            backgroundColor="bg-blue-100"
            icon={<Target className="w-5 h-5 text-blue-500" />}
            value={
              <span className="text-blue-600">{aiInsights?.averageScore}%</span>
            }
            label="Average Score"
          />
          <MetricCard
            backgroundColor="bg-purple-100"
            icon={<Clock className="w-5 h-5 text-purple-500" />}
            value={
              <span className="text-purple-600">{aiInsights?.averageTime}</span>
            }
            label="Average Time"
            delay="[animation-delay:150ms]"
          />
          <MetricCard
            backgroundColor="bg-red-100"
            icon={<Users className="w-5 h-5 text-red-500" />}
            value={
              <span className="text-red-600">
                {aiInsights?.strugglingStudents.length}
              </span>
            }
            label="Need Extra Help"
            delay="[animation-delay:300ms]"
          />
          <MetricCard
            backgroundColor="bg-green-100"
            icon={<TrendingUp className="w-5 h-5 text-green-500" />}
            value={
              <span className="text-green-600">
                {aiInsights?.strugglingAreas.length} Areas
              </span>
            }
            label="Focus Topics"
            delay="[animation-delay:450ms]"
          />
        </>
      )}
    </div>
  );

  const renderInsightsContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {isGenerating ? (
        // Loading skeleton for strengths/areas
        <>
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse"
            >
              <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 w-full bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <InsightCard
            icon={<Sparkles className="w-5 h-5 mr-2" />}
            title="Key Strengths"
            color="text-green-600"
            animationClass="animate-slide-in-from-left"
          >
            {renderInsightsList(aiInsights?.strengths, "bg-green-400")}
          </InsightCard>

          <InsightCard
            icon={<AlertTriangle className="w-5 h-5 mr-2" />}
            title="Development Areas"
            color="text-amber-600"
            animationClass="animate-slide-in-from-right"
          >
            {renderInsightsList(aiInsights?.developmentAreas, "bg-amber-400")}
          </InsightCard>
        </>
      )}
    </div>
  );

  const renderRecommendationCard = () => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm p-4 sm:p-6 border border-blue-100 animate-slide-in-from-bottom mt-6">
      <div className="flex items-start space-x-4">
        <Rocket className="w-6 h-6 text-blue-600 mt-1" />
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Recommended Action
          </h4>
          <p className="text-gray-700 text-sm">
            {isGenerating ? (
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              aiInsights?.overallRecommendation
            )}
          </p>
        </div>
      </div>
    </div>
  );

  // Render the empty state when no insights are available
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center text-center py-8 px-4 bg-blue-50/50 rounded-xl border border-blue-100 min-h-[300px]">
      <BrainCircuit className="w-16 h-16 text-blue-500 mb-3 opacity-75" />
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">AI-Generated Insights</h3>
      <p className="text-gray-600 max-w-md mb-4 text-md">
        Generate AI-powered insights to identify strengths, areas for improvement, and personalized recommendations.
      </p>
      <button
        onClick={onGenerateInsights}
        disabled={isGenerating}
        className={`flex items-center justify-center px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
          isGenerating
            ? "bg-blue-100 text-blue-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow"
        }`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating Insights...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Insights
          </>
        )}
      </button>
    </div>
  );

  // Loading state - rendered when insights are being generated
  const renderLoadingState = () => (
    <div className="space-y-6 min-h-[400px]">
      <div className="flex items-center">
        <BrainCircuit className="w-8 h-8 text-blue-600 mr-3" />
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
          AI-Generated Insights
        </h3>
      </div>
      
      <div
        ref={contentRef}
        className="transition-all duration-700 ease-in-out overflow-hidden"
        style={{
          height: contentHeight === undefined ? "auto" : `${contentHeight}px`,
          opacity: isInsightsCollapsed ? 0.3 : 1,
          transform: isInsightsCollapsed
            ? "translateY(-10px)"
            : "translateY(0)",
        }}
      >
        {/* Metrics section */}
        {renderMetricsSection()}
        
        {/* Strengths and Development Areas */}
        {renderInsightsContent()}
        
        {/* Recommendation Card */}
        {renderRecommendationCard()}
      </div>
    </div>
  );

  // Content state - rendered when insights are available
  const renderContentState = () => (
    <div className={`space-y-6 ${isInsightsCollapsed ? '' : 'min-h-[400px]'}`}>
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center">
          <BrainCircuit className="w-8 h-8 text-blue-600 mr-3" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            AI-Generated Insights
          </h3>
        </div>
        <button
          onClick={() => setIsInsightsCollapsed(!isInsightsCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={
            isInsightsCollapsed ? "Expand insights" : "Collapse insights"
          }
        >
          {isInsightsCollapsed ? (
            <ChevronDown className="w-6 h-6 text-gray-500" />
          ) : (
            <ChevronUp className="w-6 h-6 text-gray-500" />
          )}
        </button>
      </div>
      
      <div
        ref={contentRef}
        className="transition-all duration-700 ease-in-out overflow-hidden"
        style={{
          height: contentHeight === undefined ? "auto" : `${contentHeight}px`,
          opacity: isInsightsCollapsed ? 0.3 : 1,
          transform: isInsightsCollapsed
            ? "translateY(-10px)"
            : "translateY(0)",
          marginBottom: isInsightsCollapsed ? "-6px" : "0", // Remove the bottom margin when collapsed
        }}
      >
        {/* Metrics section - moved inside collapsible container */}
        {renderMetricsSection()}
        
        {/* Strengths and Development Areas */}
        {renderInsightsContent()}
        
        {/* Recommendation Card */}
        {renderRecommendationCard()}
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      {!aiInsights && !isGenerating ? (
        renderEmptyState()
      ) : isGenerating ? (
        renderLoadingState()
      ) : (
        renderContentState()
      )}
    </div>
  );
}
