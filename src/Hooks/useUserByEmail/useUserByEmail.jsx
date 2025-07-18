import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useUserByEmail = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${email}`);
      return res.data;
    },
    enabled: !!email,
  });
};

export default useUserByEmail;
