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
        className={`w-11/12 lg:w-10/12 mx-auto my-10 grid gap-3 md:gap-5 grid-cols-6 `}
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
