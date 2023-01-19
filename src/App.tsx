import Dashboard from "./pages/dashboard";
import { ThemeProvider } from "@mui/material";
import { theme } from "./globalTheme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
