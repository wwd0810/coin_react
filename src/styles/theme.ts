import baseStyled, { css, CSSProp, ThemedStyledInterface } from "styled-components";

const sizes: { [key: string]: number } = {
  mobile: 320,
  tablet: 780,
  desktop: 1180,
};

type BackQuoteArgs = string[];

interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
  large: (...args: BackQuoteArgs) => CSSProp | undefined;
}

const media: Media = {
  mobile: (...args: BackQuoteArgs) => undefined,
  tablet: (...args: BackQuoteArgs) => undefined,
  desktop: (...args: BackQuoteArgs) => undefined,
  large: (...args: BackQuoteArgs) => undefined,
};

Object.keys(sizes).reduce((acc: Media, label: string) => {
  switch (label) {
    case "desktop":
      acc.desktop = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (min-width: ${sizes.desktop}px) {
            ${args}
          }
        `;
      break;
    case "tablet":
      acc.tablet = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.desktop}px) and (min-width: ${sizes.tablet}px) {
            ${args}
          }
        `;
      break;
    case "mobile":
      acc.mobile = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.tablet}px) {
            ${args}
          }
        `;
      break;
    default:
      break;
  }
  return acc;
}, media);

const colors = {
  primary_color: "#0000AA",
  secondary_color: "#FF9900",
  grey_color: "#DDDDDD",
  dark_grey_color: "#666666",
  white_color: "#FFFFFF",
  font_grey: "#AAAAAA",
  red_color: "#EE0033",

  //   ===================
  main_shadow_color: "rgba(0,0,0,0.2)",
};

const secondaryColors = {};
const fontSizes: string[] = [];

const theme = {
  colors,
  fontSizes,
  secondaryColors,
  media,
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
