import { ProgressBar } from "./ProgressBar";
import { LessonData } from "@/lib/types";

interface LessonProgressTableProps {
  lessonData: LessonData[];
}

export function LessonProgressTable({ lessonData }: LessonProgressTableProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Lesson progress</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Lesson",
                "Average Time Spent",
                "Average Accuracy",
                "Students Complete",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lessonData.map((lesson, index) => (
              <tr key={index}>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                  {lesson.name}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                  {lesson.time}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                  {lesson.accuracy}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <ProgressBar percentage={lesson.completion} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
