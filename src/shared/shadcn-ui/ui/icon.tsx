import { Icons } from "@/shared/assets";
import { type SVGProps, forwardRef } from "react";

export type IconProps = {
  name: keyof typeof Icons;
} & SVGProps<SVGSVGElement>;

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...props }, ref) => {
    const IconComponent = Icons[name] as React.ComponentType<
      SVGProps<SVGSVGElement>
    >;
    return <IconComponent ref={ref} {...props} />;
  }
);
