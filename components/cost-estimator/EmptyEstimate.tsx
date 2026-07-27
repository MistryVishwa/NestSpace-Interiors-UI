import { Calculator, ArrowLeftRight } from "lucide-react";

export function EmptyEstimate() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-card border border-dashed border-border min-h-[420px]">
      <div className="p-4 rounded-full bg-primary/10 text-primary mb-4 animate-bounce">
        <Calculator className="h-8 w-8" />
      </div>

      <h3 className="text-xl font-bold font-serif text-foreground mb-2">
        Ready to Estimate Your Space
      </h3>

      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
        Select your room type, enter dimensions, and choose your preferred design aesthetic to see a real-time price breakdown.
      </p>

      <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-secondary/80 px-4 py-2 rounded-full border border-border">
        <ArrowLeftRight className="h-3.5 w-3.5" />
        <span>Adjust inputs on the left panel to begin</span>
      </div>
    </div>
  );
}
