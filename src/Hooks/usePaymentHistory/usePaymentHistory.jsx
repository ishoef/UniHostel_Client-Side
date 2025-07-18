import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const usePaymentHistory = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["payments", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${email}`);
      return res.data;
    },
    enabled: !!email,
  });
};

export default usePaymentHistory;
