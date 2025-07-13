import React, { useEffect, useState } from "react";
// import useAxios from "../useAxios";
import useAxiosSecure from "../useAxiosSecure";

const useMeals = () => {
//   const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get("/meals");
        setMeals(response.data);
      } catch (err) {
        console.log("Error fetching Meals data", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [axiosSecure]);

  return { meals, loading, error };
};
 
export default useMeals;
