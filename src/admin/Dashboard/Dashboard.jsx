import React, { useEffect } from "react";
import SideBar from "./SideBar/SideBar";
import DashBoardContent from "./DashBoardContent/DashBoardContent";
import useAuth from "../../Hooks/useAuth.jsx/useAuth";
import useUserRole from "../../Hooks/UseUserRole/UseUserRole";
import { useLocation, useNavigate } from "react-router";

const Dashboard = () => {
  // Set the document title
  React.useEffect(() => {
    document.title = "Dashboard | Hobby Shop";
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  // Redirect to the appropriate dashboard section based on user role
  // if the user is admin redirect to overview, otherwise to profile
  // this effect runs only once when the component runs
  useEffect(() => {
    if (!user || roleLoading) {
      return;
    }

    if (!role) {
      navigate("dash_profile", { replace: true });
      return;
    }

    if (!roleLoading && location.pathname === "/admin_dashboard") {
      if (role === "admin") {
        navigate("overview", { replace: true });
      } else {
        navigate("dash_profile", { replace: true });
      }
    }
  }, [user, roleLoading, location, role, navigate]);

  console.log(user, role, roleLoading);

  return (
    <>
      <section className={`grid grid-cols-6 `}>
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
