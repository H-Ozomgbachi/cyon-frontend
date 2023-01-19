import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    // Name of the component
    MuiTabs: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
        indicator: {
          backgroundColor: "rgba(0, 148, 50, 1)",
        },
      },
    },
  },
});
