import React, { useEffect, useState } from "react";
import NoCreatedGroups from "../../../Components/NoCreatedGroups/NoCreatedGroups";
import PreLoader from "../../../Components/Loader/PreLoader/PreLoader";
import CreatedGroups from "../CreatedGroups/CreatedGroups";

const AllGroupssTable = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const className =
    "flex justify-center items-center min-h-screen md:min-h-[calc(100vh-300px)]";
  // Set the document title
  useEffect(() => {
    document.title = "My Groups | Hobby Shop";
  }, []);

  useEffect(() => {
    fetch(`https://hobby-shop-server.vercel.app/groups`)
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user groups:", err);
        setGroups([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    // return <NormalLoader></NormalLoader>
    return <PreLoader className={className}></PreLoader>;
  }

  if (!groups || groups.length === 0) {
    return <NoCreatedGroups />;
  }

  const title = "All Groups";

  return (
    <div>
      <CreatedGroups
        title={title}
        buttonShow={false}
        groups={groups}
        setGroups={setGroups}
      />
    </div>
  );
};

export default AllGroupssTable;
