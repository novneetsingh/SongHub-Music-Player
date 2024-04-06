import React from "react";

const CloudinaryUpload = ({ setUrl, setName }) => {
  // Function to handle cloudinary upload widget
  const uploadMusicWidget = () => {
    // Access cloudinary widget from window
    const cloudinary = window.cloudinary;
    // Create cloudinary upload widget
    const widget = cloudinary.createUploadWidget(
      {
        // Cloudinary configuration options
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local"],
        resourceType: "auto",
        clientAllowedFormats: ["mp3","m4a", "wav", "ogg"], // Allow music formats
        maxFileSize: 10000000, // Set maximum file size (in bytes)
      },
      // Callback function to handle upload result
      (error, result) => {
        // Check if upload was successful
        if (!error && result && result.event === "success") {
          // Set URL and name of the uploaded file
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
        } else if (error) {
          // Log and alert if there's an upload error
          console.error("Upload error:", error);
          alert("Upload failed. Please try again.");
        }
      }
    );
    // Open the cloudinary upload widget
    widget.open();
  };

  return (
    // Button to trigger cloudinary upload widget
    <button
      className="bg-white text-black rounded-full p-4 font-semibold"
      onClick={uploadMusicWidget}
    >
      Upload Music
    </button>
  );
};

export default CloudinaryUpload;
