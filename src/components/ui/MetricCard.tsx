import { ReactNode } from "react";

interface MetricCardProps {
  backgroundColor: string;
  icon: ReactNode;
  value: ReactNode;
  label: string;
  delay?: string;
}

export function MetricCard({
  backgroundColor,
  icon,
  value,
  label,
  delay = "",
}: MetricCardProps) {
  return (
    <div
      className={`${backgroundColor} rounded-xl shadow-sm p-4 border border-gray-100 animate-slide-in-from-bottom ${delay}`}
    >
      <div className="h-8 flex flex-col justify-end mb-2">
        <div className="flex items-center justify-between">
          {icon}
          <span className="text-2xl sm:text-3xl font-bold">{value}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium text-right">{label}</p>
    </div>
  );
}
