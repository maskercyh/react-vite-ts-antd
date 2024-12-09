import { HashRouter, useRoutes, BrowserRouter } from "react-router-dom";
import { App, ConfigProvider } from "antd";
import type { RouteObject } from "react-router-dom";
import Login from "@/view/user/login";
import NotFound from "@/view/404";
import LayoutSetting from "@/config/default-setting";
import Layout from "@/layout";
import { lazy, Suspense } from "react";
import { getLocalInfo } from "@/utils/local";
import { AliveScope } from "react-activation";
import { STORAGE_AUTHORIZE_KEY } from "@/composables/authorization";
import { useCallback, useEffect, useState } from "react";
import { getUserInfo } from "@/api/user";
import type { AppDispatch } from "@/stores";
import { useDispatch } from "react-redux";
import { setMenuList, setPermissions, setUserInfo } from "@/stores/user";
// 动态导入页面
const pages = import.meta.glob("../view/**/*.tsx");
let baseRoutes: RouteObject[] = [
  {
    path: "",
    element: <Layout />,
    children: [],
  },
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
  const token = getLocalInfo(STORAGE_AUTHORIZE_KEY);
  const [routes, setRoutes] = useState<any>([]);
  const [dynamicRoutes, setDynamicRoutes] = useState<RouteObject[]>([]);
  const dispatch: AppDispatch = useDispatch();

  // 获取用户信息和权限
  const fetchUserInfo = useCallback(async () => {
    try {
      const { code, data } = await getUserInfo();
      if (Number(code) !== 200) return;
      const { user, permissions, menuList } = data;
      setRoutes(menuList); // 更新路由数据
      dispatch(setUserInfo(user));
      dispatch(setMenuList(menuList || []));
      dispatch(setPermissions(permissions));
    } catch (err) {
      console.error("获取用户数据失败:", err);
      dispatch(setPermissions([]));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token && routes.length === 0) {
      fetchUserInfo();
    }
  }, [fetchUserInfo, token, routes.length]);

  useEffect(() => {
    // 动态生成路由
    if (routes.length > 0) {
      const generatedRoutes = routes.map((item: any) => {
        const Component = lazy(() => pages[`../view/${item.element}.tsx`]());
        return {
          path: item.path,
          element: <Component />,
        };
      });
      setDynamicRoutes(generatedRoutes);
    }
  }, [routes]); // 依赖于 routes，确保路由数据更新时重新生成路由

  return useRoutes([...baseRoutes, ...dynamicRoutes]); // 渲染路由
}

function GenPage() {
  return (
    <ConfigProvider>
      <App>
        <AliveScope>
          <Suspense fallback={<div>Loading...</div>}>
            <Page />
          </Suspense>
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
  return LayoutSetting.route === "hash" ? (
    <GenHashRouter />
  ) : (
    <GenBrowserRouter />
  );
};
