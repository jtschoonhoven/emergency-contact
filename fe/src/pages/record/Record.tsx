import React from "react";
import { Link, Outlet } from "react-router-dom";

const Record: React.FC = () => {
  return (
    <>
      <p>TODO: Record</p>
      <p>
        <Link to="/">Go to /</Link>
      </p>
      <p>
        <Link to="/record/0">Go to first recording</Link>
      </p>
      <Outlet />
    </>
  );
};

export default Record;
