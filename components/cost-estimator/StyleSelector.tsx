import { StyleId, STYLES, StyleOption } from "@/lib/costEstimator";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StyleSelectorProps {
  value: StyleId;
  onChange: (value: StyleId) => void;
  error?: string;
}

export function StyleSelector({ value, onChange, error }: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <span>3. Design Style & Aesthetic</span>
          <span className="text-destructive">*</span>
        </label>
        <span className="text-xs text-muted-foreground">Select style preference</span>
      </div>

      <div
        role="radiogroup"
        aria-label="Select Design Style"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {STYLES.map((style: StyleOption) => {
          const isSelected = value === style.id;

          return (
            <button
              key={style.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(style.id)}
              className={cn(
                "relative text-left p-4 rounded-xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isSelected
                  ? "bg-primary/10 border-primary shadow-sm"
                  : "bg-card border-border hover:border-primary/50 hover:bg-accent/5"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    {style.name}
                  </h3>
                  <p className="text-[11px] text-primary font-medium">{style.tagline}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="text-[10px] py-0 font-mono bg-background">
                    {style.multiplier}x multiplier
                  </Badge>
                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {style.description}
              </p>

              <Badge variant="secondary" className="text-[10px] font-medium bg-muted/80">
                <Sparkles className="h-2.5 w-2.5 mr-1 text-primary" />
                {style.badge}
              </Badge>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs font-medium text-destructive mt-1">{error}</p>}
    </div>
  );
}
