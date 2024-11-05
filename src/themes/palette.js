// material-ui
import { createTheme } from "@mui/material/styles";

// third-party
import { presetPalettes } from "@ant-design/colors";

// project import
import ThemeOption from "./theme";

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export default function Palette(mode, presetColor) {
  const colors = presetPalettes;

  let greyPrimary = [
    "#fafafb",
    "#fafafa",
    "#f5f5f5",
    "#f0f0f0",
    "#F0F2F5",
    "#bfbfbf",
    "#8c8c8c",
    "#595959",
    "#262626",
    "#141414",
    "#000000",
  ];
  let greyAscent = ["#fafafa", "#bfbfbf", "#434343", "#1f1f1f"];
  let greyConstant = ["#fafafb", "#e6ebf1"];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];
  const paletteColor = ThemeOption(colors, presetColor, mode);

  return createTheme({
    palette: {
      mode,
      common: {
        black: "#7C7C7C",
        white: "#fff",
      },
      ...paletteColor,
      text: {
        primary: "#323C4D",
        success: paletteColor.success.main,
        secondary: paletteColor.grey[500],
        disabled: paletteColor.grey[400],
      },
      action: {
        disabled: paletteColor.grey[300],
      },
      divider: paletteColor.grey[200],
      background: {
        paper: "#F7F9FB",
        default: "#fff",
      },
    },
  });
}
