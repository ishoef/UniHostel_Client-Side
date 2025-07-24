import React, { useEffect, useState } from "react";
import useAxios from "../useAxios";

const useUpcommingMeals = (page = 1, limit = 10) => {
  const axiosInstance = useAxios();
  const [upcommingMeals, setUpcommingMeals] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcommingMeals = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/upcomming-meals?page=${page}&limit=${limit}`
        );
        setUpcommingMeals(response.data.meals);
        setTotal(response.data.total);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcommingMeals();
  }, [axiosInstance, page, limit]);

  return { upcommingMeals, setUpcommingMeals, total, loading, error };
};

export default useUpcommingMeals;
