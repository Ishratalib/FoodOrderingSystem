import React from "react";
import Navbar from "../../components/layout/Navbar";

function DashboardHome() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-8xl font-bold text-center">Welcome Admin</h1>
      </div>
    </div>
  );
}

export default DashboardHome;
