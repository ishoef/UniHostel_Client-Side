import React, { useEffect, useState } from "react";
import useAxios from "../useAxios";


const useUpcommingMeals = () => {
  const axiosInstance = useAxios();
  const [upcommingMeals, setUpcommingMeals] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcommingMeals = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/upcomming-meals");
        setUpcommingMeals(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcommingMeals();
  }, [axiosInstance]);

  return { upcommingMeals, setUpcommingMeals, loading, error };
};

export default useUpcommingMeals;
