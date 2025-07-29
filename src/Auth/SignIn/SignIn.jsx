import { useRef, useEffect, use, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import useAxios from "../../Hooks/useAxios";

const SignIn = () => {
  const { logIn, auth, setUser, loading, setLoading } = use(AuthContext);
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("user");

  const axiosInstance = useAxios();
  useEffect(() => {
    document.title = "login | UniHostel";
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setError(null);
    const email = e.target.email.value;
    const password = e.target.password.value;

    logIn(email, password)
      .then(async (result) => {
        setLoading(true);
        const isLogginUser = result.user;

        setUser(isLogginUser);

        const res = await axiosInstance.get(`/user/${email}`);
        console.log("User data from the database:", res.data);
        const dbUser = res.data;

        if (!dbUser) {
          Swal.fire({
            title: "User not Found",
            text: "Please Sign Up First",
            icon: "error",
            confirmButtonText: "Sign Up",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/signup/auth/register");
            }
          });
          setError("User not found in the database.");
          setLoading(false);

          return;
        }

        // check user role
        if (!dbUser.role) {
          Swal.fire({
            title: "Role not assigned",
            text: "Please contact the admin to assign a role.",
            icon: "error",
            confirmButtonText: "OK",
          });

          setLoading(false);
          return;
        }

        if (dbUser.role !== selectedRole.toLowerCase()) {
          Swal.fire({
            title: "Role Mismatch",
            text: `You are trying to log in as a ${selectedRole}, but your assigned role is ${dbUser?.role} `,
            icon: "error",
            confirmButtonText: "OK",
          });
          setLoading(false);

          return;
        }

        // Redirect based on user role
        if (dbUser.role === "admin") {
          navigate("/admin_dashboard");
          Swal.fire({
            title: `Welcome back My Dear ${dbUser.role}!`,
            icon: "success",
            draggable: true,
          });
        } else if (dbUser.role === "user") {
          navigate(`${location.state ? location.state : "/"}`);
          Swal.fire({
            title: `Welcome back My Dear ${dbUser.role}!`,
            icon: "success",
            draggable: true,
          });
        } else {
          Swal.fire({
            title: "Unknown Role",
            text: "Your role is not recognized. Please contact support.",
            icon: "error",
            confirmButtonText: "OK",
          });
          setLoading(false);
          return;
        }

        if (!dbUser) {
          // user not in DB, create
          const userInfo = {
            email: email,
            role: selectedRole.toLowerCase(),
            last_login: new Date().toISOString(),
          };

          const userRes = await axiosInstance.post("/users", userInfo);
          console.log(userRes.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        const errorMessages = {
          "auth/invalid-email": "Please enter a valid email address.",
          "auth/user-not-found": "No account found with this email.",
          "auth/wrong-password": "Incorrect password. Please try again.",
          "auth/invalid-credential": "Invalid email or password.",
          default: error.message,
        };
        const errorMessage = errorMessages[error.code] || errorMessages.default;
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      });
  };

  // Forgot Password
  const handleForgotPassword = () => {
    const email = emailRef.current.value;

    setError(null);

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter Your Email Address.",
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent!",
          text: "Password reset email sent. Please check your inbox.",
        });
      })
      .catch((error) => {
        const errorMessages = {
          "auth/invalid-email": "The email address is badly formatted.",
          "auth/missing-email": "No email address provided.",
          "auth/user-not-found": "No user found with this email.",
          default: "Something went wrong. Please try again.",
        };

        const message = errorMessages[error.code] || errorMessages.default;
        alert(message);
        setError(message);
      });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        placeholder="Enter Your Email"
        type="email"
        name="email"
        ref={emailRef}
        required
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition"
      />
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition"
      >
        <option>User</option>

        <option>Admin</option>
      </select>
      <p className="text-red-500">{error}</p>
      <div className="flex justify-between text-sm text-[#6B7280]">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-[#F97316]" />
          Remember me
        </label>
        <Link
          onClick={handleForgotPassword}
          className="cursor-pointer text-[#F97316] font-medium hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <button className="cursor-pointer w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition">
        {loading ? (
          <span className="animate-pulse">Signing in...</span>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default SignIn;
