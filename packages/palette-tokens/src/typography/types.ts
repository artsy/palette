import { TextVariant as V3TextVariant } from "./v3";

export type TextVariant = V3TextVariant;

export interface TextTreatment {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  fontWeight?: "normal" | "bold";
}
