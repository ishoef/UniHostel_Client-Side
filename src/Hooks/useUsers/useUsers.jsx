// Hooks/useUserByEmail.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserByEmail = async (email) => {
  const res = await axios.get(`http://localhost:5000/users/email/${email}`);
  return res.data;
};

const useUserByEmail = (email) => {
  return useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
    enabled: !!email, // prevent fetching if email is null/undefined
  });
};

export default useUserByEmail;
