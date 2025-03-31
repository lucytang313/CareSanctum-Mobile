import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";
import tw from "tailwind-react-native-classnames";

// Define a type for combined styles
type Style = ViewStyle | TextStyle | ImageStyle;

export function cn(...inputs: (string | Style)[]): Style {
  return StyleSheet.flatten(inputs.map(input => typeof input === "string" ? tw`${input}` : input) as Style[]);
}
