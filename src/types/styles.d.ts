import * as React from "react";

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       item: React.DetailedHTMLProps<
//         React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       >;
//     }
//   }
// }
