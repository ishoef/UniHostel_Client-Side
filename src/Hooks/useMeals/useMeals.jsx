import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const fetchMeals = async (axiosInstance, filters, page, limit) => {
  const response = await axiosInstance.get("/meals", {
    params: { ...filters, page, limit },
  });
  return response.data;
};

const useMeals = (filters = {}, page = 1, limit = 10) => {
  const axiosInstance = useAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["meals", filters, page, limit],
    queryFn: () => fetchMeals(axiosInstance, filters, page, limit),
    keepPreviousData: true, // for pagination
  });

  return {
    meals: data?.data || [],
    totalMeals: data?.totalMeals || 0,
    totalPages: Math.ceil((data?.totalMeals || 0) / limit),
    loading: isLoading,
    error: isError ? error : null,
  };
};

export default useMeals;
