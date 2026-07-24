import { CalculationResult, formatCurrency } from "@/lib/costEstimator";
import { EstimateCard } from "./EstimateCard";
import { EstimatorChart } from "./EstimatorChart";
import { CostBreakdown } from "./CostBreakdown";
import { Button } from "@/components/ui/button";
import { Printer, Download, Share2, PhoneCall, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface CostSummaryProps {
  result: CalculationResult;
}

export function CostSummary({ result }: CostSummaryProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `
NESTSPACE INTERIORS - COST ESTIMATE REPORT
Generated: ${new Date().toLocaleDateString()}
--------------------------------------------------
Room Type: ${result.selectedRoom.name}
Dimensions: ${result.selectedRoom.defaultLength} x ${result.selectedRoom.defaultWidth} ft (${result.areaSqFt} sq. ft.)
Design Style: ${result.selectedStyle.name} (${result.selectedStyle.multiplier}x)
Material Quality: ${result.selectedMaterial.name} ($${result.selectedMaterial.ratePerSqFt}/sq. ft.)
Furniture Package: ${result.selectedFurniture.name}
Add-ons: ${result.selectedAddons.map((a) => a.name).join(", ") || "None"}

COST BREAKDOWN:
- Base Labor & Architecture: ${formatCurrency(result.baseCost)}
- Materials & Surface Finishes: ${formatCurrency(result.materialCost)}
- Furniture & Fittings: ${formatCurrency(result.furnitureCost)}
- Add-on Features: ${formatCurrency(result.addonCost)}
--------------------------------------------------
Subtotal: ${formatCurrency(result.subtotal)}
Taxes & Statutory Fees (${result.taxRate * 100}%): ${formatCurrency(result.taxAmount)}
GRAND TOTAL ESTIMATE: ${formatCurrency(result.grandTotal)}
Estimated Completion Timeline: ${result.estimatedTimelineWeeks.formatted}
--------------------------------------------------
Contact NestSpace Interiors to confirm details & start your project.
Website: https://nestspace-interiors.vercel.app/
    `.trim();

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `NestSpace_Estimate_${result.selectedRoom.name.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Estimate summary downloaded successfully!");
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Estimate link copied to clipboard!");
        setTimeout(() => setCopied(false), 3000);
      } else {
        toast.info("Sharing link: " + shareUrl);
      }
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Estimate Total & Recommendation Card */}
      <EstimateCard result={result} />

      {/* SVG/CSS Chart Breakdown */}
      <EstimatorChart breakdown={result.breakdown} grandTotal={result.grandTotal} />

      {/* Itemized Invoice Table */}
      <CostBreakdown
        breakdown={result.breakdown}
        subtotal={result.subtotal}
        taxAmount={result.taxAmount}
        taxRate={result.taxRate}
        grandTotal={result.grandTotal}
      />

      {/* Action Buttons (Print, Download, Share) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-card border border-border shadow-xs no-print">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs"
          >
            <Printer className="h-3.5 w-3.5 mr-1.5" />
            Print Estimate
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="text-xs"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Download Summary
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="text-xs"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              Share Estimate
            </>
          )}
        </Button>
      </div>

      {/* Consultation Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-foreground mb-1">
            Ready to bring this design to life?
          </h4>
          <p className="text-xs text-muted-foreground">
            Schedule a complimentary 30-minute consultation with our lead interior architect.
          </p>
        </div>
        <Button size="sm" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
          <PhoneCall className="h-3.5 w-3.5 mr-1.5" />
          Book Free Consultation
        </Button>
      </div>
    </div>
  );
}
