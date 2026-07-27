import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Maximize2, Box, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DimensionInputsProps {
  length: number;
  width: number;
  height: number;
  onLengthChange: (val: number) => void;
  onWidthChange: (val: number) => void;
  onHeightChange: (val: number) => void;
  errors?: {
    length?: string;
    width?: string;
    height?: string;
  };
}

export function DimensionInputs({
  length,
  width,
  height,
  onLengthChange,
  onWidthChange,
  onHeightChange,
  errors,
}: DimensionInputsProps) {
  const area = Math.round((length || 0) * (width || 0));
  const volume = Math.round(area * (height || 0));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <span>2. Room Dimensions (Feet)</span>
          <span className="text-destructive">*</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-muted-foreground hover:text-foreground">
                  <Info className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs">
                Enter room length, width, and ceiling height in feet to calculate carpet area & spatial volume.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>

        {/* Live Area Indicator */}
        <div className="flex items-center gap-3 text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg font-medium">
          <span className="flex items-center gap-1">
            <Maximize2 className="h-3.5 w-3.5" />
            Area: <strong className="font-bold text-foreground">{area} sq ft</strong>
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="flex items-center gap-1">
            <Box className="h-3.5 w-3.5" />
            Vol: <strong className="font-bold text-foreground">{volume} cu ft</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Length Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <Label htmlFor="length" className="text-xs font-medium text-foreground">
              Length (ft)
            </Label>
            <span className="text-muted-foreground text-[11px]">5 - 100 ft</span>
          </div>
          <Input
            id="length"
            type="number"
            min={5}
            max={100}
            value={length || ""}
            onChange={(e) => onLengthChange(Number(e.target.value))}
            className="bg-card font-mono text-sm"
            placeholder="e.g. 15"
          />
          {errors?.length && (
            <p className="text-[11px] font-medium text-destructive">{errors.length}</p>
          )}
        </div>

        {/* Width Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <Label htmlFor="width" className="text-xs font-medium text-foreground">
              Width (ft)
            </Label>
            <span className="text-muted-foreground text-[11px]">5 - 100 ft</span>
          </div>
          <Input
            id="width"
            type="number"
            min={5}
            max={100}
            value={width || ""}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            className="bg-card font-mono text-sm"
            placeholder="e.g. 12"
          />
          {errors?.width && (
            <p className="text-[11px] font-medium text-destructive">{errors.width}</p>
          )}
        </div>

        {/* Height Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <Label htmlFor="height" className="text-xs font-medium text-foreground">
              Height (ft)
            </Label>
            <span className="text-muted-foreground text-[11px]">7 - 20 ft</span>
          </div>
          <Input
            id="height"
            type="number"
            min={7}
            max={20}
            value={height || ""}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="bg-card font-mono text-sm"
            placeholder="e.g. 9"
          />
          {errors?.height && (
            <p className="text-[11px] font-medium text-destructive">{errors.height}</p>
          )}
        </div>
      </div>
    </div>
  );
}
