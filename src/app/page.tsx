"use client";
import { useSession } from "next-auth/react";
import DateTableUserDashboard from "./components/dates/table/dashboard/page";
import Metrics from "./components/dashboard/metrics/page";
import Charts from "./components/dashboard/charts/page";

const DashboardPage = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full h-screen">
      <div className="container grid gap-2 grid-cols-2 h-[80%]">
        <div className="col-span-1 bg-slate-200 ">
          <DateTableUserDashboard userID={session?.user?.identification} />
        </div>
        <div className="col-span-1 bg-slate-200 p-2 w-full">
          <Metrics />
        </div>
        <div className="col-span-2 bg-slate-200 p-2">
          <Charts />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
