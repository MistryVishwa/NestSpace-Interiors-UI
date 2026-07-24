import * as React from "react"
import { CheckCircle2, Equal, Sparkles, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ColorSwatch } from "@/lib/compareData"
import { cn } from "@/lib/utils"

export type FeatureValueType =
  | "text"
  | "badge-list"
  | "color-palette"
  | "bullet-list"
  | "highlight-list"

interface FeatureRowProps {
  label: string
  icon?: React.ReactNode
  type?: FeatureValueType
  valueA: string | string[] | ColorSwatch[]
  valueB: string | string[] | ColorSwatch[]
  isMatch?: boolean
  advantage?: "A" | "B" | null
  advantageNote?: string
  differencesOnly?: boolean
  description?: string
}

export function FeatureRow({
  label,
  icon,
  type = "text",
  valueA,
  valueB,
  isMatch = false,
  advantage = null,
  advantageNote,
  differencesOnly = false,
  description,
}: FeatureRowProps) {
  // If user enabled "differences only" and this row is a match, skip rendering
  if (differencesOnly && isMatch) {
    return null
  }

  const renderValueContent = (val: string | string[] | ColorSwatch[], slot: "A" | "B") => {
    const isAdvantage = advantage === slot

    if (type === "color-palette" && Array.isArray(val)) {
      const swatches = val as ColorSwatch[]
      return (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {swatches.map((swatch, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-muted/40 px-2 py-1 rounded-lg border border-border/40 text-xs">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs shrink-0"
                  style={{ backgroundColor: swatch.hex }}
                  aria-hidden="true"
                />
                <span className="font-medium text-foreground text-[11px]">{swatch.name}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if ((type === "badge-list" || type === "bullet-list") && Array.isArray(val)) {
      const items = val as string[]
      return (
        <div className="space-y-1.5">
          <div className="flex flex-wrap gap-1.5">
            {items.map((item, idx) => (
              <Badge
                key={idx}
                variant={isAdvantage ? "default" : "secondary"}
                className={cn(
                  "text-xs font-normal py-0.5 px-2 rounded-lg border",
                  isAdvantage
                    ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    : "bg-muted/60 text-muted-foreground border-border/50"
                )}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      )
    }

    if (type === "highlight-list" && Array.isArray(val)) {
      const items = val as string[]
      return (
        <ul className="space-y-1 text-xs text-foreground list-disc list-inside">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    }

    // Default text format
    return (
      <div className="space-y-1">
        <span
          className={cn(
            "text-xs sm:text-sm font-semibold text-foreground",
            isAdvantage && "text-primary font-bold"
          )}
        >
          {String(val)}
        </span>
        {isAdvantage && advantageNote && (
          <p className="text-[11px] text-primary flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3" />
            <span>{advantageNote}</span>
          </p>
        )}
      </div>
    )
  }

  return (
    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
      {/* Feature Title / Label Column */}
      <td className="py-4 px-4 sm:px-6 align-top w-1/4 sm:w-1/5 bg-muted/10 font-medium">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground">
            {icon && <span className="text-primary">{icon}</span>}
            <span>{label}</span>
          </div>
          {description && (
            <p className="text-[11px] text-muted-foreground font-normal line-clamp-2">
              {description}
            </p>
          )}

          {/* Match / Diff Indicator Badge */}
          <div className="pt-1">
            {isMatch ? (
              <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 gap-1 px-1.5 py-0">
                <Equal className="w-3 h-3" />
                <span>Identical</span>
              </Badge>
            ) : (
              <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 gap-1 px-1.5 py-0">
                <Sparkles className="w-3 h-3" />
                <span>Distinct</span>
              </Badge>
            )}
          </div>
        </div>
      </td>

      {/* Project A Column */}
      <td className="py-4 px-4 sm:px-6 align-top w-3/8 sm:w-2/5 border-l border-border/40">
        {renderValueContent(valueA, "A")}
      </td>

      {/* Project B Column */}
      <td className="py-4 px-4 sm:px-6 align-top w-3/8 sm:w-2/5 border-l border-border/40">
        {renderValueContent(valueB, "B")}
      </td>
    </tr>
  )
}
