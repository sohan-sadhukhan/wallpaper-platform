import Header from "@/components/Header/Header";
import { ReactNode } from "react";
import "../globals.css";

type PublicLayoutProps = Readonly<{
  children: ReactNode;
}>;

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl">{children}</main>
    </>
  );
};

export default PublicLayout;
