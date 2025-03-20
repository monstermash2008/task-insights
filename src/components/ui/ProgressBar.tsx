interface ProgressBarProps {
  percentage: number;
  width?: string;
}

export function ProgressBar({
  percentage,
  width = "w-16 sm:w-32",
}: ProgressBarProps) {
  return (
    <div className="flex items-center">
      <div className={`${width} bg-gray-200 rounded-full h-2.5 mr-2`}>
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-sm">{percentage}%</span>
    </div>
  );
}
