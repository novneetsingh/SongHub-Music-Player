import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { toast } from 'react-hot-toast';
import Logo from "../assets/logo.svg";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";

const Signup = () => {
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // State variables for cookies and navigation
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate email and confirm email fields
    if (email !== confirmEmail) {
      toast.error("Email and confirm email fields must match. Please check again");
      return;
    }

    try {
      // Data to be sent in the POST request
      const data = { email, password, username, firstName, lastName };
      const response = await makeUnauthenticatedPOSTRequest("/auth/signup", data);

      if (response && !response.err) {
        // Set token as a cookie and redirect user to home page on success
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        toast.success("Signup successful!");
        navigate("/home");
      } else {
        // Display error message on failure
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Provide all fields")
    }
  };

  return (
    <div className=" p-8 rounded-2xl shadow-2xl shadow-black mt-52 mb-8 bg-white">
      {/* Logo */}
      <div className="flex justify-center items-center mb-8 ">
        <img src={Logo} alt="Logo" />
        <span className="font-bold text-3xl text-[#32CD32]">SongHub</span>
      </div>

      {/* Signup form */}
      <form onSubmit={handleSubmit}>
        <div className="inputRegion">
          <div className="font-bold text-3xl mb-6">Sign up for SongHub</div>

          {/* Form inputs */}
          <TextInput
            label="Email address"
            placeholder="Enter your email"
            value={email}
            setValue={setEmail}
          />
          <TextInput
            label="Confirm Email Address"
            placeholder="Enter your email again"
            value={confirmEmail}
            setValue={setConfirmEmail}
          />
          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            setValue={setUsername}
          />
          <PasswordInput
            label="Create Password"
            placeholder="Enter a strong password here"
            value={password}
            setValue={setPassword}
          />
          <div className="flex gap-2 w-1/2 mt-1">
            <TextInput
              label="First Name"
              placeholder="Enter Your First Name"
              value={firstName}
              setValue={setFirstName}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter Your Last Name"
              value={lastName}
              setValue={setLastName}
            />
          </div>

          {/* Submit button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#32CD32] text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-500 transition duration-300"
            >
              Sign Up
            </button>
          </div>

          {/* Signup link */}
          <div className="mt-6 border-b border-gray-300 "></div>
          <div className="mt-6 font-semibold text-center text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-[#32CD32] hover:underline ">
              Log In to SongHub
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
