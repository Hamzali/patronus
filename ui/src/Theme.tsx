import React, { FunctionComponent } from "react";
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    customBgColor: React.CSSProperties["color"];
  }
  interface PaletteOptions {
    customBgColor: React.CSSProperties["color"];
  }
}

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#71b9c8",
    },
    secondary: {
      main: "#f50057",
    },
    customBgColor: "#fafafa",
  },
});

const Theme: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
  );
};

export default Theme;
