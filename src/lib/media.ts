// Media queries the site's motion and pointer behaviour hang off, in one place.
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
/** a mouse or trackpad: hover effects, cursor physics and leans only make sense here */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)"
/** phones and small tablets, where scroll-linked motion is scaled down to fit */
export const PHONE = "(max-width: 768px)"
