interface ProgressOverviewProps {
  progressData: {
    color: string;
    label: string;
    value: number;
  }[];
}

export function ProgressOverview({ progressData }: ProgressOverviewProps) {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {progressData.map(({ color, label, value }) => (
        <div
          key={label}
          className={`bg-${color}-100 rounded-lg p-4 text-center`}
        >
          <p className="text-xl sm:text-2xl font-semibold">{value}</p>
          <p className="text-xs sm:text-sm text-gray-500">{label}</p>
        </div>
      ))}
    </div>
  );
}
