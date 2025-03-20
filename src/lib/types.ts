export interface AIInsights {
  averageScore: number;
  averageTime: string;
  focus: string;
  strengths: string[];
  developmentAreas: string[];
  strugglingStudents: string[];
  strugglingAreas: string[];
  overallRecommendation: string;
}

export interface LessonData {
  name: string;
  time: string;
  accuracy: string;
  completion: number;
}

// Lesson table data
export const lessonData: LessonData[] = [
  {
    name: "1. Living and Non-living Things",
    time: "6 min",
    accuracy: "63%",
    completion: 78,
  },
  {
    name: "2. Environments",
    time: "2 min",
    accuracy: "64%",
    completion: 71,
  },
  {
    name: "3. Plants and their Environment",
    time: "3 min",
    accuracy: "63%",
    completion: 75,
  },
];

export const progressData = [
  { color: "blue", label: "ASSIGNED", value: 10 },
  { color: "red", label: "NOT STARTED", value: 1 },
  { color: "yellow", label: "IN PROGRESS", value: 4 },
  { color: "green", label: "FINISHED", value: 5 },
];
