import { ReactNode } from "react";
import { Header } from "@/app/dashboard/components/header";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DashboardLayout;
