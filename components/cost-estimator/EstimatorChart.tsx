import { CostBreakdownCategory, formatCurrency } from "@/lib/costEstimator";
import { PieChart } from "lucide-react";

interface EstimatorChartProps {
  breakdown: CostBreakdownCategory[];
  grandTotal: number;
}

export function EstimatorChart({ breakdown, grandTotal }: EstimatorChartProps) {
  // SVG Donut Calculations (100% Pure Functional Calculation)
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.327

  const donutSlices = breakdown.map((item, index) => {
    const cumulativeOffset = breakdown
      .slice(0, index)
      .reduce((sum, prev) => sum + prev.percentage, 0);
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativeOffset / 100) * circumference);
    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="rounded-2xl bg-card border border-border/80 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <PieChart className="h-4 w-4 text-primary" />
          Cost Distribution Breakdown
        </h3>
        <span className="text-xs text-muted-foreground">Proportional Allocation</span>
      </div>

      {/* Horizontal Multi-color Segment Bar */}
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded-full overflow-hidden flex bg-secondary border border-border/40">
          {breakdown.map((item) => (
            <div
              key={item.key}
              style={{
                width: `${Math.max(item.percentage, 2)}%`,
                backgroundColor: item.color,
              }}
              className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
              title={`${item.label}: ${item.percentage}%`}
            />
          ))}
        </div>
      </div>

      {/* SVG Donut + Interactive Legend */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
        {/* SVG Donut */}
        <div className="relative shrink-0 w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {donutSlices.map((slice) => (
              <circle
                key={slice.key}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth="14"
                strokeDasharray={slice.strokeDasharray}
                strokeDashoffset={slice.strokeDashoffset}
                className="transition-all duration-700 ease-out hover:opacity-85 cursor-pointer"
              >
                <title>{`${slice.label}: ${formatCurrency(slice.amount)} (${slice.percentage}%)`}</title>
              </circle>
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[10px] text-muted-foreground uppercase font-mono">Total</span>
            <span className="text-xs font-bold text-foreground font-mono">
              {formatCurrency(grandTotal)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2">
          {breakdown.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-3 w-3 rounded-xs shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 font-mono shrink-0">
                <span className="font-semibold text-foreground">{formatCurrency(item.amount)}</span>
                <span className="text-[11px] text-muted-foreground w-9 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
