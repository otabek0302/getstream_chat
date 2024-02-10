// eslint-disable react-hooks/exhaustive-deps 
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// eslint-disable-next-line
// import "stream-chat-react/dist/css/index.css";

import { ResultContextProvider } from "./context/customContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ResultContextProvider>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </ResultContextProvider>
);
