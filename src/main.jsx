import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SongContextProvider from "./context/SongContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SongContextProvider>
      <App />
      <Toaster />
    </SongContextProvider>
  </BrowserRouter>
);
