import { colors } from "./tokens/colors.js";
import { typography } from "./tokens/typography.js";
import { spacing } from "./tokens/spacing.js";
import { radius } from "./tokens/radius.js";
import { shadows } from "./tokens/shadows.js";
import { animations } from "./tokens/animations.js";
import { breakpoints } from "./tokens/breakpoints.js";

export {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  animations,
  breakpoints
};

export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  animations,
  breakpoints
} as const;

export type DesignTokens = typeof tokens;
export type ColorsToken = typeof colors;
export type TypographyToken = typeof typography;
export type SpacingToken = typeof spacing;
export type RadiusToken = typeof radius;
export type ShadowsToken = typeof shadows;
export type AnimationsToken = typeof animations;
export type BreakpointsToken = typeof breakpoints;
