"use client";
import { ThemeProvider, createTheme } from "@mui/material";

export default function Provider({ children}: {children: React.ReactNode} ){
  const theme = createTheme({
    palette: {
      primary: {
        main: "#538D22"
      },
      secondary: {
        main: "#245501"
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}