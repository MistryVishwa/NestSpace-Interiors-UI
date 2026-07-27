"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2, AlertTriangle } from "lucide-react"

interface RemoveFavoriteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmText?: string
}

export function RemoveFavoriteDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Remove from Favorites?",
  description = "Are you sure you want to remove this design from your saved favorites? You can add it back anytime.",
  confirmText = "Remove Design",
}: RemoveFavoriteDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl p-6 shadow-2xl">
        <DialogHeader className="gap-2 text-left">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-2">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <DialogTitle className="font-serif text-xl font-bold text-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto rounded-xl h-10 px-5 text-sm"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            className="w-full sm:w-auto rounded-xl h-10 px-5 text-sm bg-rose-600 hover:bg-rose-700 text-white gap-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>{confirmText}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
