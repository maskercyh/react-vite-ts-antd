import {
  HashRouter,
  useRoutes,
  Routes,
  BrowserRouter,
  Route,
} from "react-router-dom";
import { useEffect } from "react";
import { App, ConfigProvider } from "antd";
import type { RouteObject } from "react-router-dom";
import Login from "@/view/user/login";
import NotFound from "@/view/404";
import Index from "@/view/index/index";
import LayoutSetting from "@/config/default-setting";
import Layout from "@/layout";
// keepalive
import { AliveScope, KeepAlive } from "react-activation";
const newRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "index",
        element: <Index />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

function Page() {
  return useRoutes(newRoutes);
}

function GenPage() {
  return (
    <ConfigProvider>
      <App>
        <AliveScope>
          <Page />
        </AliveScope>
      </App>
    </ConfigProvider>
  );
}
function GenHashRouter() {
  return (
    <HashRouter>
      <GenPage />
    </HashRouter>
  );
}
function GenBrowserRouter() {
  return (
    <BrowserRouter>
      <GenPage />
    </BrowserRouter>
  );
}

export default () => {
  // 顶部进度条
  useEffect(() => {}, []);

  useEffect(() => {
    return () => {};
  }, []);

  return LayoutSetting.route === "hash" ? (
    <GenHashRouter />
  ) : (
    <GenBrowserRouter />
  );
};
