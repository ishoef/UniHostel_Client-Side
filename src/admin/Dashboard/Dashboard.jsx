import React from "react";
import SideBar from "./SideBar/SideBar";
import DashBoardContent from "./DashBoardContent/DashBoardContent";

const Dashboard = () => {
  // Set the document title
  React.useEffect(() => {
    document.title = "Dashboard | Hobby Shop";
  }, []);

  return (
    <>
      <section
        className={`grid grid-cols-6 `}
      >
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-5">
          <DashBoardContent />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
