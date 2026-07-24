import { FurnitureId, FURNITURE_PACKAGES, FurnitureOption } from "@/lib/costEstimator";
import { Check, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface FurnitureSelectorProps {
  value: FurnitureId;
  onChange: (value: FurnitureId) => void;
  error?: string;
}

export function FurnitureSelector({ value, onChange, error }: FurnitureSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <span>5. Furniture Package</span>
          <span className="text-destructive">*</span>
        </label>
        <span className="text-xs text-muted-foreground">Select furnishing tier</span>
      </div>

      <div
        role="radiogroup"
        aria-label="Select Furniture Package"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {FURNITURE_PACKAGES.map((pkg: FurnitureOption) => {
          const isSelected = value === pkg.id;

          return (
            <button
              key={pkg.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(pkg.id)}
              className={cn(
                "relative text-left p-4 rounded-xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex flex-col justify-between",
                isSelected
                  ? "bg-primary/10 border-primary shadow-sm"
                  : "bg-card border-border hover:border-primary/50 hover:bg-accent/5"
              )}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 rounded-lg bg-muted text-foreground mb-1">
                    <Package className="h-4 w-4" />
                  </div>
                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-sm text-foreground">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {pkg.description}
                </p>

                <div className="space-y-1 mb-3">
                  <span className="text-xs font-bold text-primary block">
                    ${pkg.flatCost.toLocaleString()} base + ${pkg.perSqFtRate}/sq ft
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-medium text-foreground block">Inclusions:</span>
                  <ul className="space-y-1">
                    {pkg.inclusions.map((inc, idx) => (
                      <li key={idx} className="text-[11px] text-muted-foreground flex items-start gap-1">
                        <span className="text-primary font-bold">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs font-medium text-destructive mt-1">{error}</p>}
    </div>
  );
}
