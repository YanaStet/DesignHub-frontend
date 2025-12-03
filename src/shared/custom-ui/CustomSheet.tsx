import type React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../shadcn-ui/ui/sheet";
import clsx from "clsx";

type CustomSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function CustomSheet({
  open,
  setOpen,
  children,
  title,
  className,
}: CustomSheetProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className={clsx(
          "bg-primary-1 text-white border-primary-1 p-5",
          className
        )}
      >
        <SheetHeader>
          <SheetTitle className="text-gray-6">{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
