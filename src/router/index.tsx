import { HashRouter as Router, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { App, ConfigProvider } from "antd";
import type { RouteObject } from "react-router-dom";
import Login from "@/view/user/login";
import NotFound from "@/view/404";

const newRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default () => {
  useEffect(() => {
    console.log("page initialized");
  }, []);

  return (
    <Router>
      <ConfigProvider>
        <App>
          {useRoutes(newRoutes)}
        </App>
      </ConfigProvider>
    </Router>
  );
};
