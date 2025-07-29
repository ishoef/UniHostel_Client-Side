import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const fetchUpcommingMeals = async (axiosInstance, page, limit, category) => {
  let query = `?page=${page}`;
  if (limit !== undefined) query += `&limit=${limit}`;
  if (category && category !== "All Categories") {
    query += `&category=${encodeURIComponent(category)}`;
  }

  const response = await axiosInstance.get(`/upcomming-meals${query}`);
  return response.data;
};

const useUpcommingMeals = (page = 1, limit, category = "All Categories") => {
  const axiosInstance = useAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["upcommingMeals", page, limit, category],
    queryFn: () => fetchUpcommingMeals(axiosInstance, page, limit, category),
    keepPreviousData: true,
  });

  return {
    upcommingMeals: data?.meals || [],
    total: data?.total || 0,
    loading: isLoading,
    error: isError ? error : null,
  };
};

export default useUpcommingMeals;
