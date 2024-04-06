import axios from "axios";

// Backend URL retrieved from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Function to make a POST request to the backend without requiring authentication
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  try {
    // Making the POST request to the specified route
    const response = await axios.post(`${BACKEND_URL}${route}`, body, {
      headers: {
        "Content-Type": "application/json", // Setting request headers
      },
    });
    return response.data; // Returning response data
  } catch (error) {
    // Handling errors by logging and throwing them
    console.error("Error making POST request:", error);
    throw error;
  }
};

// Function to make a POST request to the backend with authentication
export const makeAuthenticatedPOSTRequest = async (route, body) => {
  // Retrieving the authentication token
  const token = getToken();

  try {
    // Making the authenticated POST request
    const response = await axios.post(`${BACKEND_URL}${route}`, body, {
      headers: {
        "Content-Type": "application/json", // Setting request headers
        Authorization: `Bearer ${token}`, // Including the authentication token in the headers
      },
    });

    return response.data; // Returning response data
  } catch (error) {
    // Handling errors by logging and throwing them
    console.error("Error making POST request:", error);
    throw error;
  }
};

// Function to make a GET request to the backend with authentication
export const makeAuthenticatedGETRequest = async (route) => {
  // Retrieving the authentication token
  const token = getToken();

  try {
    // Making the authenticated GET request
    const response = await axios.get(`${BACKEND_URL}${route}`, {
      headers: {
        "Content-Type": "application/json", // Setting request headers
        Authorization: `Bearer ${token}`, // Including the authentication token in the headers
      },
    });

    return response.data; // Returning response data
  } catch (error) {
    // Handling errors by logging and throwing them
    console.error("Error making GET request:", error);
    throw error;
  }
};

// Function to extract the authentication token from cookies
const getToken = () => {
  const tokenRegex = /token=([^;]+)/; // Regular expression to match the token value in cookies
  const match = document.cookie.match(tokenRegex); // Matching the regex against the cookies
  return match ? match[1] : null; // Returning the captured token value or null if not found
};
