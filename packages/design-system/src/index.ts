import { colors } from "./tokens/colors";
import { typography } from "./tokens/typography";
import { spacing } from "./tokens/spacing";
import { radius } from "./tokens/radius";
import { shadows } from "./tokens/shadows";
import { animations } from "./tokens/animations";
import { breakpoints } from "./tokens/breakpoints";

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
