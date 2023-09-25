import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/root/Root";
import Record from "./pages/record/Record";
import RouteError from "./components/error/RouteError";
import Recording from "./pages/record/Recording";

const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RouteError />,
  },
  {
    path: "/record",
    element: <Record />,
    children: [
      {
        path: ":recordIndex",
        element: <Recording />,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={ROUTES} />;
};

export default Router;
