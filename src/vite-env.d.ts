// Декларації для звичайних SVG
declare module "*.svg" {
  const content: string;
  export default content;
}

// Декларації для SVG як React-компонентів (через ?react або svgr)
declare module "*.svg?react" {
  import * as React from "react";
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
