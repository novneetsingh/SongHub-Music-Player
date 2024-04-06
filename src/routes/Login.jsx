import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Logo from "../assets/logo.svg";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast

const Login = () => {
  // State for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are provided
    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    try {
      const data = { email, password };
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
        data
      );

      if (response && response.token) {
        // Set token expiration date to 1 hour from now
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 3600 * 1000); // 3600 seconds * 1000 milliseconds = 1 hour

        // Set token as a cookie
        setCookie("token", response.token, {
          path: "/",
          expires: expirationTime,
        });
        toast.success("logged in successfully");
        // Redirect user to home page
        navigate("/home");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      // Display error toast notification
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-2xl shadow-black">
      {/*logo */}
      <div className="flex justify-center items-center mb-8 ">
        <img src={Logo} alt="Logo" />
        <span className="font-bold text-3xl text-[#32CD32]">SongHub</span>
      </div>

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="font-bold text-2xl mb-6">
          To continue, log in to SongHub
        </div>

        {/* Email input */}
        <TextInput
          label="Email address or username"
          placeholder="Email address or username"
          value={email}
          setValue={setEmail}
        />

        {/* Password input */}
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-[#32CD32] text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-600 transition duration-300 mt-6"
        >
          LOG IN
        </button>
      </form>

      {/* Signup link */}
      <div className="mt-6 border-b border-gray-300"></div>
      <div className="mt-6 font-semibold text-lg text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#32CD32] hover:underline">
          Sign up for SongHub
        </Link>
      </div>
    </div>
  );
};

export default Login;
