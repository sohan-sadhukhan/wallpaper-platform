import Header from "@/components/Header/Header";
import { ReactNode } from "react";
import "../globals.css";

type ProtectedLayoutProps = Readonly<{
  children: ReactNode;
}>;

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl">{children}</main>;
    </>
  );
};

export default ProtectedLayout;
