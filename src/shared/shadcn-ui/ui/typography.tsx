import React, { type BaseSyntheticEvent } from "react";
import { clsx } from "clsx";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "button";

export type TypographyProps = {
  children: React.ReactNode;
  className?: string;
  component?: React.ElementType;
  variant?: TypographyVariant;
  style?: React.CSSProperties;
  onClick?: (event?: BaseSyntheticEvent) => void;
};

const variantToElementMapping: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body1: "p",
  body2: "p",
  body3: "p",
  body4: "p",
  button: "span",
};

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-[28px] leading-[34px] font-semibold",
  h2: "text-[24px] leading-[29px] font-semibold",
  h3: "text-[18px] leading-[22px] font-semibold",
  h4: "text-[16px] leading-[19px] font-semibold",
  h5: "text-[14px] leading-[17px] font-semibold",
  h6: "text-[12px] leading-[14px] font-semibold",

  body1: "text-[18px] leading-[22px] font-normal",
  body2: "text-[16px] leading-[19px] font-normal",
  body3: "text-[14px] leading-[17px] font-normal",
  body4: "text-[12px] leading-[14px] font-normal",

  button: "text-[14px] leading-[17px] font-semibold",
};

export const Typography = React.memo<TypographyProps>(
  ({
    children,
    className,
    component,
    variant: scale = "body2",
    style,
    onClick,
  }) => {
    const Component = component || variantToElementMapping[scale];

    return (
      <Component
        className={clsx(
          variantClasses[scale],
          onClick && "cursor-pointer",
          "text-gray-1",
          className
        )}
        style={style}
        onClick={onClick}
      >
        {children}
      </Component>
    );
  }
);
