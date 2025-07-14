import React, { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

const useUpcommingMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [upcommingMeals, setUpcommingMeals] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcommingMeals = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get("/upcomming-meals");
        setUpcommingMeals(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcommingMeals();
  }, [axiosSecure]);

  return { upcommingMeals, setUpcommingMeals, loading, error };
};

export default useUpcommingMeals;
