import React from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TextWithHover = ({ displayText }) => {
  // Accessing cookies for authentication
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear token cookie and navigate to home page
    setCookie("token", "", { path: "/" });
    toast.error("logged out successfully")
    navigate("/");
  };

  return (
    <div className="flex items-center justify-start cursor-pointer">
      {/* Text with hover effect */}
      <div
        className="text-gray-500 font-semibold hover:text-white"
        onClick={() => {
          // Check if the text is "Logout" and call handleLogout
          if (displayText === "Logout") {
            handleLogout();
          }
        }}
      >
        {displayText}
      </div>
    </div>
  );
};

export default TextWithHover;
