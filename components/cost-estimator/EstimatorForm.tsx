"use client";

import { useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EstimatorFormData,
  estimatorSchema,
  calculateEstimate,
  PRESETS,
  RoomTypeId,
  StyleId,
  MaterialId,
  FurnitureId,
  AddonId,
  CalculationResult,
} from "@/lib/costEstimator";
import { RoomSelector } from "./RoomSelector";
import { DimensionInputs } from "./DimensionInputs";
import { StyleSelector } from "./StyleSelector";
import { MaterialSelector } from "./MaterialSelector";
import { FurnitureSelector } from "./FurnitureSelector";
import { AddonSelector } from "./AddonSelector";
import { CostSummary } from "./CostSummary";
import { EmptyEstimate } from "./EmptyEstimate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Sparkles, DollarSign, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_FORM_VALUES: EstimatorFormData = {
  roomType: "living-room",
  length: 18,
  width: 14,
  height: 9,
  style: "modern",
  material: "standard",
  furniturePackage: "standard",
  addons: ["lighting", "false-ceiling"],
  budgetPreference: 25000,
};

export function EstimatorForm() {
  const [, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EstimatorFormData>({
    resolver: zodResolver(estimatorSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
  });

  const formValues = useWatch({ control });
  const currentValues: EstimatorFormData = {
    roomType: formValues.roomType || DEFAULT_FORM_VALUES.roomType,
    length: formValues.length ?? DEFAULT_FORM_VALUES.length,
    width: formValues.width ?? DEFAULT_FORM_VALUES.width,
    height: formValues.height ?? DEFAULT_FORM_VALUES.height,
    style: formValues.style || DEFAULT_FORM_VALUES.style,
    material: formValues.material || DEFAULT_FORM_VALUES.material,
    furniturePackage: formValues.furniturePackage || DEFAULT_FORM_VALUES.furniturePackage,
    addons: formValues.addons || DEFAULT_FORM_VALUES.addons,
    budgetPreference: formValues.budgetPreference ?? DEFAULT_FORM_VALUES.budgetPreference,
  };

  // Safe Calculation
  let result: CalculationResult | null = null;
  try {
    result = calculateEstimate(currentValues);
  } catch (err) {
    console.error("Estimate calculation error:", err);
  }

  const handleRoomChange = (roomType: RoomTypeId) => {
    setValue("roomType", roomType, { shouldValidate: true });
  };

  const handleLengthChange = (val: number) => {
    setValue("length", val, { shouldValidate: true });
  };

  const handleWidthChange = (val: number) => {
    setValue("width", val, { shouldValidate: true });
  };

  const handleHeightChange = (val: number) => {
    setValue("height", val, { shouldValidate: true });
  };

  const handleStyleChange = (style: StyleId) => {
    setValue("style", style, { shouldValidate: true });
  };

  const handleMaterialChange = (material: MaterialId) => {
    setValue("material", material, { shouldValidate: true });
  };

  const handleFurnitureChange = (pkg: FurnitureId) => {
    setValue("furniturePackage", pkg, { shouldValidate: true });
  };

  const handleAddonsChange = (addons: AddonId[]) => {
    setValue("addons", addons, { shouldValidate: true });
  };

  const handlePresetSelect = (presetData: EstimatorFormData) => {
    startTransition(() => {
      reset(presetData);
      toast.success(`Loaded preset configuration!`);
    });
  };

  const handleResetForm = () => {
    reset(DEFAULT_FORM_VALUES);
    toast.info("Form reset to default values.");
  };

  const onSubmit = (data: EstimatorFormData) => {
    toast.success(`Estimate recalculated for ${data.roomType}!`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
      {/* Preset Pickers */}
      <div className="mb-8 p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Quick Preset Configurations</h2>
          </div>
          <span className="text-xs text-muted-foreground">Load pre-configured templates</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetSelect(preset.data)}
              className="text-left p-3 rounded-xl bg-secondary/50 hover:bg-primary/10 border border-border/60 hover:border-primary/40 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {preset.name}
                </span>
                <Badge variant="outline" className="text-[9px] py-0 font-medium">
                  {preset.badge}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-1">{preset.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Room Selector */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
            <RoomSelector
              value={currentValues.roomType}
              onChange={handleRoomChange}
              error={errors.roomType?.message}
            />
          </div>

          {/* Step 2: Dimensions */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
            <DimensionInputs
              length={currentValues.length}
              width={currentValues.width}
              height={currentValues.height}
              onLengthChange={handleLengthChange}
              onWidthChange={handleWidthChange}
              onHeightChange={handleHeightChange}
              errors={{
                length: errors.length?.message,
                width: errors.width?.message,
                height: errors.height?.message,
              }}
            />
          </div>

          {/* Step 3: Design Style */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
            <StyleSelector
              value={currentValues.style}
              onChange={handleStyleChange}
              error={errors.style?.message}
            />
          </div>

          {/* Step 4: Material Level */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
            <MaterialSelector
              value={currentValues.material}
              onChange={handleMaterialChange}
              error={errors.material?.message}
            />
          </div>

          {/* Step 5: Furniture Package */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
            <FurnitureSelector
              value={currentValues.furniturePackage}
              onChange={handleFurnitureChange}
              error={errors.furniturePackage?.message}
            />
          </div>

          {/* Step 6: Add-ons */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
            <AddonSelector
              value={currentValues.addons as AddonId[]}
              onChange={handleAddonsChange}
            />
          </div>

          {/* Step 7: Budget Preference */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label htmlFor="budgetPreference" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <span>7. Target Budget Preference</span>
                <span className="text-destructive">*</span>
              </label>
              <span className="text-xs text-muted-foreground">Used for budget matching analysis</span>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="budgetPreference"
                  type="number"
                  step={500}
                  min={500}
                  max={1000000}
                  value={currentValues.budgetPreference || ""}
                  onChange={(e) => setValue("budgetPreference", Number(e.target.value), { shouldValidate: true })}
                  className="pl-9 bg-card font-mono text-sm"
                  placeholder="e.g. 25000"
                />
              </div>

              {errors.budgetPreference && (
                <p className="text-xs font-medium text-destructive">{errors.budgetPreference.message}</p>
              )}

              {/* Quick Budget Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[15000, 25000, 40000, 60000].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setValue("budgetPreference", b, { shouldValidate: true })}
                    className="text-xs px-2.5 py-1 rounded-lg bg-secondary hover:bg-primary/10 text-foreground transition-colors font-mono"
                  >
                    ${b.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleResetForm}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Reset All Fields
            </Button>

            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
              <Sparkles className="h-4 w-4 mr-1.5" />
              Recalculate Estimate
            </Button>
          </div>
        </div>

        {/* Right Column: Live Sticky Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            {result ? <CostSummary result={result} /> : <EmptyEstimate />}
          </div>
        </div>
      </form>
    </div>
  );
}
