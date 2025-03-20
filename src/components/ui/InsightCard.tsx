import { ReactNode } from "react";

interface InsightCardProps {
  icon: ReactNode;
  title: string;
  color: string;
  children: ReactNode;
  animationClass?: string;
}

export function InsightCard({
  icon,
  title,
  color,
  children,
  animationClass = "",
}: InsightCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 ${animationClass}`}
    >
      <h4 className={`flex items-center text-lg font-semibold ${color} mb-4`}>
        {icon}
        {title}
      </h4>
      {children}
    </div>
  );
}
