import { CalculationResult, formatCurrency } from "@/lib/costEstimator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Maximize2, CheckCircle2, AlertTriangle, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface EstimateCardProps {
  result: CalculationResult;
}

export function EstimateCard({ result }: EstimateCardProps) {
  const { recommendation } = result;

  const statusBg =
    recommendation.status === "over_budget"
      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      : recommendation.status === "under_budget"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      : "bg-primary/10 text-primary border-primary/20";

  const StatusIcon =
    recommendation.status === "over_budget"
      ? AlertTriangle
      : recommendation.status === "under_budget"
      ? TrendingUp
      : CheckCircle2;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card border border-border/80 p-6 shadow-lg luxury-card">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Estimated Project Total
        </span>
        <Badge variant="outline" className="text-xs font-medium bg-background">
          Tax & Fees Included
        </Badge>
      </div>

      {/* Main Total Amount */}
      <div className="mb-6">
        <div className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight text-gradient mb-1">
          {formatCurrency(result.grandTotal)}
        </div>
        <p className="text-xs text-muted-foreground">
          Subtotal {formatCurrency(result.subtotal)} + Estimated Taxes ({result.taxRate * 100}%) {formatCurrency(result.taxAmount)}
        </p>
      </div>

      {/* Key Metric Chips */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-secondary/60 border border-border/50">
          <span className="text-[11px] text-muted-foreground block mb-0.5 flex items-center gap-1">
            <Maximize2 className="h-3 w-3 text-primary" /> Carpet Area
          </span>
          <span className="text-base font-bold text-foreground font-mono">
            {result.areaSqFt} <span className="text-xs font-sans font-normal text-muted-foreground">sq ft</span>
          </span>
        </div>

        <div className="p-3 rounded-xl bg-secondary/60 border border-border/50">
          <span className="text-[11px] text-muted-foreground block mb-0.5 flex items-center gap-1">
            <Calendar className="h-3 w-3 text-primary" /> Est. Timeline
          </span>
          <span className="text-base font-bold text-foreground">
            {result.estimatedTimelineWeeks.formatted}
          </span>
        </div>
      </div>

      {/* Budget Status Banner */}
      <div className={cn("p-4 rounded-xl border mb-6", statusBg)}>
        <div className="flex items-start gap-2.5">
          <StatusIcon className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm mb-0.5">{recommendation.title}</h4>
            <p className="text-xs opacity-90 leading-relaxed mb-2">{recommendation.message}</p>
            {recommendation.suggestions.length > 0 && (
              <div className="space-y-1">
                {recommendation.suggestions.map((sug, idx) => (
                  <p key={idx} className="text-[11px] opacity-80 flex items-center gap-1">
                    <span className="font-bold">•</span> {sug}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Choices Tags */}
      <div className="space-y-2 pt-2 border-t border-border/60">
        <span className="text-[11px] font-semibold text-muted-foreground block">
          Selected Configuration Summary:
        </span>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs font-normal">
            {result.selectedRoom.name}
          </Badge>
          <Badge variant="secondary" className="text-xs font-normal">
            {result.selectedStyle.name} Style
          </Badge>
          <Badge variant="secondary" className="text-xs font-normal">
            {result.selectedMaterial.name} Finish
          </Badge>
          <Badge variant="secondary" className="text-xs font-normal">
            {result.selectedFurniture.name}
          </Badge>
          {result.selectedAddons.map((addon) => (
            <Badge key={addon.id} variant="outline" className="text-xs font-normal bg-primary/5 text-primary border-primary/20">
              <Sparkles className="h-2.5 w-2.5 mr-1" />
              {addon.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
