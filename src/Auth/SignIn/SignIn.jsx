import { useRef, useEffect, use, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";

const SignIn = () => {
  const { logIn, auth, setUser } = use(AuthContext);
  const emailRef = useRef();

  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "login | UniHostel";
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  // Manual Login
  const handleLogin = (e) => {
    e.preventDefault();

    setError(null);
    const email = e.target.email.value;
    const password = e.target.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;

        setUser(user);
        navigate(`${location.state ? location.state : "/"}`);
        Swal.fire({
          title: "Congratulations! Welcome to Our World",
          icon: "success",
          draggable: true,
        });
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
      <select className="w-full border border-gray-300 rounded-md p-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition">
        <option>Student</option>

        <option>Admin</option>
      </select>
      <p className="text-red-500" >{error}</p>
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

      <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
