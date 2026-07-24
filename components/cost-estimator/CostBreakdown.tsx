import { CostBreakdownCategory, formatCurrency } from "@/lib/costEstimator";
import { Receipt } from "lucide-react";

interface CostBreakdownProps {
  breakdown: CostBreakdownCategory[];
  subtotal: number;
  taxAmount: number;
  taxRate: number;
  grandTotal: number;
}

export function CostBreakdown({
  breakdown,
  subtotal,
  taxAmount,
  taxRate,
  grandTotal,
}: CostBreakdownProps) {
  return (
    <div className="rounded-2xl bg-card border border-border/80 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Receipt className="h-4 w-4 text-primary" />
          Transparent Itemized Invoice
        </h3>
        <span className="text-xs text-muted-foreground">Estimated Quote</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
              <th scope="col" className="py-2 px-1">Component / Line Item</th>
              <th scope="col" className="py-2 px-1 text-center">Share</th>
              <th scope="col" className="py-2 px-1 text-right">Estimated Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {breakdown.map((item) => (
              <tr key={item.key} className="hover:bg-muted/40 transition-colors">
                <td className="py-3 px-1">
                  <span className="font-semibold text-foreground block">{item.label}</span>
                  <span className="text-[11px] text-muted-foreground block">{item.description}</span>
                </td>
                <td className="py-3 px-1 text-center font-mono text-muted-foreground">
                  {item.percentage}%
                </td>
                <td className="py-3 px-1 text-right font-mono font-semibold text-foreground">
                  {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border font-semibold">
              <td colSpan={2} className="py-2 px-1 text-muted-foreground">
                Subtotal
              </td>
              <td className="py-2 px-1 text-right font-mono text-foreground">
                {formatCurrency(subtotal)}
              </td>
            </tr>
            <tr className="border-t border-border/40">
              <td colSpan={2} className="py-2 px-1 text-muted-foreground">
                Taxes & Statutory Fees ({taxRate * 100}%)
              </td>
              <td className="py-2 px-1 text-right font-mono text-muted-foreground">
                {formatCurrency(taxAmount)}
              </td>
            </tr>
            <tr className="border-t-2 border-primary bg-primary/5">
              <td colSpan={2} className="py-3 px-2 text-sm font-bold font-serif text-foreground">
                Estimated Grand Total
              </td>
              <td className="py-3 px-2 text-right text-base font-bold font-mono text-primary">
                {formatCurrency(grandTotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
