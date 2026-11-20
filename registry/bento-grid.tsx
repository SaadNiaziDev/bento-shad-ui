import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Bento grid for shadcn/ui projects (bento-shad-ui).
 * Columns follow the grid's own width: 1, then 2 from 36rem, then 4 from 56rem.
 */
function BentoGrid({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<"div"> & { containerClassName?: string }) {
  return (
    <div data-slot="bento" className={cn("@container", containerClassName)}>
      <div data-slot="bento-grid" className={cn("bento-grid", className)} {...props} />
    </div>
  )
}

const bentoTileVariants = cva("bento-tile", {
  variants: {
    tone: {
      default: "",
      muted: "bg-muted border-transparent",
      peach: "bg-tint-peach text-tint-peach-foreground border-transparent",
      sky: "bg-tint-sky text-tint-sky-foreground border-transparent",
      mint: "bg-tint-mint text-tint-mint-foreground border-transparent",
      lilac: "bg-tint-lilac text-tint-lilac-foreground border-transparent",
      butter: "bg-tint-butter text-tint-butter-foreground border-transparent",
      inverse: "bg-inverse text-inverse-foreground border-transparent",
      brand: "bg-brand text-brand-foreground border-transparent",
    },
    span: {
      1: "",
      2: "@xl:col-span-2",
      3: "@xl:col-span-2 @4xl:col-span-3",
      4: "@xl:col-span-2 @4xl:col-span-4",
      full: "col-span-full",
    },
    rows: {
      1: "",
      2: "@xl:row-span-2",
      3: "@xl:row-span-3",
    },
    interactive: {
      true: "cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md",
      false: "",
    },
  },
  defaultVariants: { tone: "default", span: 1, rows: 1, interactive: false },
})

function BentoTile({
  className,
  tone,
  span,
  rows,
  interactive,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof bentoTileVariants>) {
  return (
    <div
      data-slot="bento-tile"
      className={cn(bentoTileVariants({ tone, span, rows, interactive }), className)}
      {...props}
    />
  )
}

function BentoTileHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="bento-tile-header" className={cn("flex items-start justify-between gap-3", className)} {...props} />
}

function BentoTileTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="bento-tile-title" className={cn("text-[15px] leading-tight font-semibold tracking-tight", className)} {...props} />
}

function BentoTileDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="bento-tile-description" className={cn("mt-1 text-[13px] opacity-75", className)} {...props} />
}

function BentoTileFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="bento-tile-footer" className={cn("mt-auto flex flex-wrap items-center justify-between gap-3", className)} {...props} />
}

export {
  BentoGrid,
  BentoTile,
  BentoTileHeader,
  BentoTileTitle,
  BentoTileDescription,
  BentoTileFooter,
  bentoTileVariants,
}
