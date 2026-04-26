import Header from "@/components/Header/Header";
import authUserServer from "@/server/authUserServer";
import { ReactNode } from "react";
import "../globals.css";

type ProtectedLayoutProps = Readonly<{
  children: ReactNode;
}>;

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  await authUserServer();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl">{children}</main>;
    </>
  );
};

export default ProtectedLayout;
