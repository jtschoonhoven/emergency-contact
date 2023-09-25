import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const RouteError: React.FC = () => {
  const error = useRouteError();
  let message: string;

  if (isRouteErrorResponse(error)) {
    message = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Unknown error";
  }
  console.error(error);

  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </>
  );
};

export default RouteError;
