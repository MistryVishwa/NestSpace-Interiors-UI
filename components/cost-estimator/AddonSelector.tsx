import { AddonId, ADDONS, AddonOption } from "@/lib/costEstimator";
import { Zap, Layers, Cpu, LayoutGrid, Box, Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AddonSelectorProps {
  value: AddonId[];
  onChange: (value: AddonId[]) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Layers,
  Cpu,
  LayoutGrid,
  Box,
  Palette,
};

export function AddonSelector({ value = [], onChange }: AddonSelectorProps) {
  const toggleAddon = (id: AddonId) => {
    if (value.includes(id)) {
      onChange(value.filter((item) => item !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <span>6. Optional Enhancements & Add-ons</span>
        </label>
        <span className="text-xs text-muted-foreground">Select multiple (optional)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ADDONS.map((addon: AddonOption) => {
          const IconComponent = ICON_MAP[addon.iconName] || Zap;
          const isSelected = value.includes(addon.id as AddonId);

          return (
            <button
              key={addon.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => toggleAddon(addon.id as AddonId)}
              className={cn(
                "relative text-left p-3.5 rounded-xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex items-start gap-3",
                isSelected
                  ? "bg-primary/10 border-primary shadow-sm"
                  : "bg-card border-border hover:border-primary/50 hover:bg-accent/5"
              )}
            >
              <div
                className={cn(
                  "p-2.5 rounded-lg shrink-0 transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <IconComponent className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="font-medium text-sm text-foreground truncate">{addon.name}</h3>
                  {addon.popular && (
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-medium">
                      Popular
                    </Badge>
                  )}
                </div>

                <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">
                  {addon.description}
                </p>

                <span className="text-xs font-semibold text-primary">
                  {addon.pricingType === "per_sqft"
                    ? `$${addon.price}/sq ft`
                    : `$${addon.price.toLocaleString()} flat`}
                </span>
              </div>

              <div
                className={cn(
                  "h-5 w-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border bg-background"
                )}
              >
                {isSelected && <Check className="h-3 w-3" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
