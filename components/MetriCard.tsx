import React from "react";

type MetricCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  trend?: string;
  className?: string;
};

export default function MetricCard({
  label,
  value,
  sub,
  icon,
  trend,
  className,
}: MetricCardProps) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon || null}
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl md:text-2xl font-bold tracking-tight">
          {value}
        </span>
        {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
      </div>
      {trend && (
        <p className="text-[10px] text-muted-foreground border-l-2 pl-2 border-sky-100">
          {trend}
        </p>
      )}
    </div>
  );
}
