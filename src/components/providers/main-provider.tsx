"use client";

import { useEffect } from "react";
import { ThemeProvider } from "./theme-provider";

type MainPProps = {
  children: React.ReactNode;
};

export function MainProvider({ children, ...props }: MainPProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
