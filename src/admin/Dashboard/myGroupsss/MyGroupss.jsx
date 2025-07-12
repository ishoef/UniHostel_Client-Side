import React, { useEffect, useState, useContext } from "react";
import NoCreatedGroups from "../../../Components/NoCreatedGroups/NoCreatedGroups";
import { AuthContext } from "../../../Context/AuthProvider";
import CreatedGroups from "../CreatedGroups/CreatedGroups";
import PreLoader from "../../../Components/Loader copy/PreLoader/PreLoader";

const MyGroupess = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const className =
    "flex justify-center items-center min-h-screen md:min-h-[calc(100vh-300px)]";
  // Set the document title
  useEffect(() => {
    document.title = "My Groups | Hobby Shop";
  }, []);

  useEffect(() => {
    if (user && user.email) {
      fetch(
        `https://hobby-shop-server.vercel.app/groups?userEmail=${user.email}`
      )
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
    } else {
      // If user not ready yet, keep loading or handle it here
      setGroups([]);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    // return <NormalLoader></NormalLoader>
    return <PreLoader className={className}></PreLoader>;
  }

  if (!groups || groups.length === 0) {
    return <NoCreatedGroups />;
  }

  const title = "My Groups";

  return (
    <div>
      <CreatedGroups
        title={title}
        buttonShow={true}
        groups={groups}
        setGroups={setGroups}
      />
    </div>
  );
};

export default MyGroupess;
