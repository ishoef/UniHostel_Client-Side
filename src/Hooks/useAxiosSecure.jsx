// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../Context/AuthProvider";

// const axiosSecure = axios.create({
//   baseURL: `http://localhost:5000`,
// });

// const useAxiosSecure = () => {
//   const { user } = useContext(AuthContext);

//   axiosSecure.interceptors.request.use(
//     (config) => {
//       config.headers.Authorization = `Bearer ${user.accessToken}`;
 
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   return axiosSecure;
// };

// export default useAxiosSecure;


import axios from "axios";
import { useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAuth from "./useAuth.jsx/useAuth";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
});

const useAxiosSecure = () => {
  const { user } = useAuth();
    
  useEffect(() => {
    if (!user?.accessToken) return;

    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  
    // Clean up on unmount
    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, [user?.accessToken]);

  return axiosSecure;
};

export default useAxiosSecure;
