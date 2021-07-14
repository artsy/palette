export interface TextTreatment {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  fontWeight?: "normal" | "bold";
}

/** font-families */
export const TEXT_FONTS = {
  sans: '"ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif',
  serif: '"adobe-garamond-pro", "Times New Roman", Times, serif',
};

/** font-size scale */
export const TEXT_FONT_SIZES = {
  size12: "62px",
  size11: "55px",
  size10: "48px",
  size9: "32px",
  size8: "28px",
  size7: "24px",
  size6: "18px",
  size5: "16px",
  size4: "15px",
  size3: "14px",
  size2: "13px",
  size1: "12px",
};

/** line-height scale */
export const TEXT_LINE_HEIGHTS = {
  solid: 1,
  title: 1.25,
  body: 1.5,
};

/** letter-spacing scale */
export const TEXT_LETTER_SPACING = {
  tight: "-0.02em",
  tightest: "-0.03em",
};

/** Names of typographic treatments */
export const TEXT_VARIANT_NAMES = [
  "largeTitle",
  "title",
  "subtitle",
  "text",
  "mediumText",
  "caption",
  "small",
] as const;

/** Available typographic treatments */
export const TEXT_VARIANTS: Record<
  string,
  Record<typeof TEXT_VARIANT_NAMES[number], TextTreatment>
> = {
  large: {
    largeTitle: {
      fontSize: "size9",
      lineHeight: "title",
      letterSpacing: "tight",
      fontWeight: "normal",
    },
    title: {
      fontSize: "size7",
      lineHeight: "title",
      letterSpacing: "tight",
      fontWeight: "normal",
    },
    subtitle: {
      fontSize: "size6",
      lineHeight: "title",
      fontWeight: "normal",
    },
    text: {
      fontSize: "size3",
      lineHeight: "body",
      fontWeight: "normal",
    },
    mediumText: {
      fontSize: "size3",
      lineHeight: "body",
      fontWeight: "bold",
    },
    caption: {
      fontSize: "size2",
      lineHeight: "body",
      fontWeight: "normal",
    },
    small: {
      fontSize: "size1",
      lineHeight: "body",
      fontWeight: "normal",
    },
  },
  small: {
    largeTitle: {
      fontSize: "size8",
      lineHeight: "title",
      letterSpacing: "tight",
      fontWeight: "normal",
    },
    title: {
      fontSize: "size6",
      lineHeight: "title",
      letterSpacing: "tight",
      fontWeight: "normal",
    },
    subtitle: {
      fontSize: "size5",
      lineHeight: "title",
      fontWeight: "normal",
    },
    text: {
      fontSize: "size4",
      lineHeight: "body",
      fontWeight: "normal",
    },
    mediumText: {
      fontSize: "size4",
      lineHeight: "body",
      fontWeight: "bold",
    },
    caption: {
      fontSize: "size3",
      lineHeight: "body",
      fontWeight: "normal",
    },
    small: {
      fontSize: "size2",
      lineHeight: "body",
      fontWeight: "normal",
    },
  },
};

/** Name of typographic treatment */
export type TextVariant = typeof TEXT_VARIANT_NAMES[number];

/**
 * Type definition for font objects
 */
export interface FontDefinition {
  fontFamily: string;
  fontWeight?: string | number;
  fontStyle?: string;
}

/**
 * Type definition for font value properties which can either
 * be an object for complex definitions or a string for single entries.
 */
export type FontValue = string | FontDefinition;

/**
 * Defines the shape of the font family
 */
export interface FontFamily {
  sans: {
    regular: FontValue;
    italic: FontValue;
    medium: FontValue;
    mediumItalic: FontValue;
  };
  serif: {
    regular: FontValue;
    italic: FontValue;
    semibold: FontValue;
  };
  display: {
    regular: FontValue;
  };
}

const sansFallback = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/**
 * A map of the font families and their settings
 */
export const fontFamily: FontFamily = {
  sans: {
    regular: `Unica77LLWebRegular, ${sansFallback}`,
    italic: {
      fontFamily: `Unica77LLWebItalic, ${sansFallback}`,
      fontStyle: "italic",
    },
    medium: {
      fontFamily: `Unica77LLWebMedium, ${sansFallback}`,
      fontWeight: 500,
    },
    mediumItalic: {
      fontFamily: `Unica77LLWebMediumItalic, ${sansFallback}`,
      fontWeight: 500,
      fontStyle: "italic",
    },
  },
  serif: {
    regular:
      "'Adobe Garamond W08', 'adobe-garamond-pro', 'AGaramondPro-Regular', 'Times New Roman', Times, serif",
    italic: {
      fontFamily:
        "'Adobe Garamond W08', 'adobe-garamond-pro', 'AGaramondPro-Regular', 'Times New Roman', Times, serif",
      fontStyle: "italic",
    },
    semibold: {
      fontFamily:
        "'Adobe Garamond W08', 'adobe-garamond-pro', 'AGaramondPro-Regular', 'Times New Roman', Times, serif",
      fontWeight: 600,
    },
  },
  display: {
    regular:
      "'ITC Avant Garde Gothic W04','AvantGardeGothicITCW01D 731075', AvantGardeGothicITCW01Dm, Helvetica, sans-serif",
  },
};
