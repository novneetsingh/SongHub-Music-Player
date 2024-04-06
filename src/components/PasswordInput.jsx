import React from "react";

const PasswordInput = ({ 
  label,        // Label text for the password input field
  placeholder,  // Placeholder text for the password input field
  value,        // Value of the password input field
  setValue      // Function to set the value of the password input field
}) => {
  return (
    // Container for the password input field
    <div className="flex flex-col space-y-2 w-full mb-2">
      {/* Label for the password input field */}
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      {/* Password input field */}
      <input
        type="password"
        placeholder={placeholder}
        className="p-3 border border-gray-400 rounded placeholder-gray-500 focus:outline-none focus:border-blue-500"
        id={label}
        value={value}
        onChange={(e) => {
          // Call setValue function to update the value when input changes
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default PasswordInput;
