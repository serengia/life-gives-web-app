"use client";

import type { ComponentPropsWithoutRef } from "react";

import { useInView } from "@/lib/hooks/useInView";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<"div">;

export default function RevealOnScroll({
  className,
  children,
  ...props
}: Props) {
  const ref = useInView();
  return (
    <div ref={ref} className={cn("reveal-on-scroll", className)} {...props}>
      {children}
    </div>
  );
}
