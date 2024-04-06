import React from "react";

const TextInput = ({
  label,        // Label text for the input field
  placeholder,  // Placeholder text for the input field
  value,        // Value of the input field
  setValue,     // Function to set the value of the input field
}) => {
  return (
    // Container for the input field
    <div className="w-full flex flex-col space-y-2 mb-2">
      {/* Label for the input field */}
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      {/* Input field */}
      <input
        type="text"
        placeholder={placeholder}
        className="p-3 border border-gray-400 rounded placeholder-gray-500 focus:outline-none focus:border-blue-500 text-black"
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

export default TextInput;
