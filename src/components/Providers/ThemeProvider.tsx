"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps } from "react";
import Footer from "../Footer";
import ToastProvider from "./ToastProvider";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <div className="flex min-h-dvh flex-col">
        <div className="flex-1">{children}</div> <Footer />
      </div>
      <ToastProvider />
    </NextThemesProvider>
  );
};

export default ThemeProvider;
