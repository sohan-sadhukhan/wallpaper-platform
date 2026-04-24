import Header from "@/components/Header/Header";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import { ReactNode } from "react";
import "./globals.css";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem={false}>
          <Header />

          <main className="mx-auto max-w-7xl">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
