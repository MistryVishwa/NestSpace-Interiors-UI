import { MaterialId, MATERIALS, MaterialOption } from "@/lib/costEstimator";
import { Check, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface MaterialSelectorProps {
  value: MaterialId;
  onChange: (value: MaterialId) => void;
  error?: string;
}

export function MaterialSelector({ value, onChange, error }: MaterialSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <span>4. Material Quality Tier</span>
          <span className="text-destructive">*</span>
        </label>
        <span className="text-xs text-muted-foreground">Select finish level</span>
      </div>

      <div
        role="radiogroup"
        aria-label="Select Material Quality Tier"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {MATERIALS.map((mat: MaterialOption) => {
          const isSelected = value === mat.id;

          return (
            <button
              key={mat.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(mat.id)}
              className={cn(
                "relative text-left p-4 rounded-xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex flex-col justify-between",
                isSelected
                  ? "bg-primary/10 border-primary shadow-sm"
                  : "bg-card border-border hover:border-primary/50 hover:bg-accent/5"
              )}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{mat.name}</h3>
                    <span className="text-xs font-bold text-primary">${mat.ratePerSqFt}/sq ft</span>
                  </div>
                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {mat.description}
                </p>

                <ul className="space-y-1 mb-4">
                  {mat.features.map((feat, idx) => (
                    <li key={idx} className="text-[11px] text-foreground/80 flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-primary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-border/40">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Shield className="h-3 w-3 text-primary/70" />
                  {mat.recommendedFor}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs font-medium text-destructive mt-1">{error}</p>}
    </div>
  );
}
