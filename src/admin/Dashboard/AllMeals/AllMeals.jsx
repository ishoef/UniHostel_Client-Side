// import React, { useEffect, useState } from "react";
import NoCreatedGroups from "../../../Components/NoCreatedGroups/NoCreatedGroups";
import CreatedGroups from "../CreatedGroups/CreatedGroups";
import PreLoader from "../../../Components/Loader copy/PreLoader/PreLoader";
import useMeals from "../../../Hooks/useMeals/useMeals";

const AllMeals = () => {
  // const [groups, setGroups] = useState([]);
  // const [loading, setLoading] = useState(true);

  const { meals, loading, setMeals } = useMeals();
  
  const className =
    "flex justify-center items-center min-h-screen md:min-h-[calc(100vh-300px)]";
  // // Set the document title
  // useEffect(() => {
  //   document.title = "My Groups | Hobby Shop";
  // }, []);

  // useEffect(() => {
  //   fetch(`https://hobby-shop-server.vercel.app/groups`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setGroups(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch user groups:", err);
  //       setGroups([]);
  //       setLoading(false);
  //     });
  // }, []);

  if (loading) {
    // return <NormalLoader></NormalLoader>
    return <PreLoader className={className}></PreLoader>;
  }

  if (!meals || meals.length === 0) {
    return <NoCreatedGroups />;
  }

  return (
    <div>
      <CreatedGroups setMeals={setMeals} buttonShow={true} meals={meals} />
    </div>
  );
};

export default AllMeals;
