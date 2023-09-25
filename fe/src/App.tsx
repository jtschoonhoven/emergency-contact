import React from "react";
import Navbar from "./components/navbar/Navbar";
import Router from "./Router";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container px-4 pt-4">
        <Router />
      </div>
    </>
  );
};

export default App;
