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

  if (loading) {
    // return <NormalLoader></NormalLoader>
    return <PreLoader className={className}></PreLoader>;
  }

  const sortedMeals = [...meals].sort((a, b) => {

    // sort by rating (deccending)
    if (b.rating !== a.rating) return b.rating - a.rating;

    // sort by review_count (deccending)
    if (b.review_count !== a.review_count) return b.review_count - a.review_count;

    // sort by likes (deccending)
    if (b.likes !== a.likes) return b.likes - a.likes;

    // sort by createdAt (ascending)
    return new Date(a.createdAt) - new Date(b.createdAt);

  })

  if (!meals || meals.length === 0) {
    return <NoCreatedGroups />;
  }

  return (
    <div>
      <CreatedGroups
        setMeals={setMeals}
        buttonShow={true}
        meals={sortedMeals}
      />
    </div>
  );
};

export default AllMeals;
