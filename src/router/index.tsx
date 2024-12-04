import {
  HashRouter,
  useRoutes,
  Routes,
  BrowserRouter ,
  Route,
} from "react-router-dom";
import { useEffect } from "react";
import { App, ConfigProvider } from "antd";
import type { RouteObject } from "react-router-dom";
import Login from "@/view/user/login";
import NotFound from "@/view/404";
import LayoutSetting from "@/config/default-setting"

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

function Page() {
  return useRoutes(newRoutes);
}

function GenPage() {
  return (
    <ConfigProvider>
      <App>
        <Page />
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
function GenBrowserRouter(){
  return (
    <BrowserRouter>
      <GenPage />
    </BrowserRouter>
  );
}

export default () => {
   // 顶部进度条
   useEffect(() => {
  }, []);

  useEffect(() => {

    return () => {
    };
  }, []);

  return (
    LayoutSetting.route === 'hash'? <GenHashRouter /> : <GenBrowserRouter />
  );
};
