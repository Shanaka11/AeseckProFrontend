// Material Ui Imports
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    common: {
      green2: "#499F68",
      green3: "#77B28C",
      green4: "#3ebfbc",
      orange: "#f17828",
    },
    primary: {
      main: "#157A6E",
      // main: "#3ebfbc",
    },
    secondary: {
      // main: "#77B28C",
      main: "#f17828",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#ffffff",
    },
  },
});
