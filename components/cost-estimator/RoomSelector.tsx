import { RoomTypeId, ROOM_TYPES, RoomTypeOption } from "@/lib/costEstimator";
import { Sofa, Bed, Utensils, Bath, Briefcase, UtensilsCrossed, Building2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomSelectorProps {
  value: RoomTypeId;
  onChange: (value: RoomTypeId) => void;
  error?: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Sofa,
  Bed,
  Utensils,
  Bath,
  Briefcase,
  UtensilsCrossed,
  Building2,
};

export function RoomSelector({ value, onChange, error }: RoomSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <span>1. Select Room Type</span>
          <span className="text-destructive">*</span>
        </label>
        <span className="text-xs text-muted-foreground">Select one option</span>
      </div>

      <div
        role="radiogroup"
        aria-label="Select Room Type"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {ROOM_TYPES.map((room: RoomTypeOption) => {
          const IconComponent = ICON_MAP[room.iconName] || Sofa;
          const isSelected = value === room.id;

          return (
            <button
              key={room.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(room.id)}
              className={cn(
                "relative group text-left p-3.5 rounded-xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isSelected
                  ? "bg-primary/10 border-primary shadow-sm"
                  : "bg-card border-border hover:border-primary/50 hover:bg-accent/5"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  <IconComponent className="h-5 w-5" />
                </div>
                {isSelected && (
                  <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>

              <h3 className="font-medium text-sm text-foreground mb-0.5">{room.name}</h3>
              <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">
                {room.description}
              </p>

              <span className="inline-block text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                ${room.baseRatePerSqFt}/sq ft base
              </span>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs font-medium text-destructive mt-1">{error}</p>}
    </div>
  );
}
