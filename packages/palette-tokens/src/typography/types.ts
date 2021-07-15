import { TextVariant as V2TextVariant } from "./v2";
import { TextVariant as V3TextVariant } from "./v3";

/** Union of v2 & v3 text variants */
export type TextVariant = V2TextVariant | V3TextVariant;

export interface TextTreatment {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  fontWeight?: "normal" | "bold";
}
