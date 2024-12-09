import {
  HashRouter,
  useRoutes,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import { App, ConfigProvider } from "antd";
import type { RouteObject } from "react-router-dom";
import Login from "@/view/user/login";
import NotFound from "@/view/404";
import LayoutSetting from "@/config/default-setting";
import Layout from "@/layout";
import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { getLocalInfo } from "@/utils/local";
import KeepAlive from "react-activation";
import { STORAGE_AUTHORIZE_KEY } from "@/composables/authorization";
import { getUserInfo } from "@/api/user";
import type { AppDispatch } from "@/stores";
import Loading from "~@/components/Loading";
import { setMenuList, setPermissions, setUserInfo } from "@/stores/user";
import { useSelector, useDispatch } from "react-redux";
import AppPage from "./App";
// Page 组件外部包装
function GenPage() {
  const navigator = useNavigate();
  const token = getLocalInfo(STORAGE_AUTHORIZE_KEY);
  const dispatch: AppDispatch = useDispatch();
  // 获取用户信息和权限
  const fetchUserInfo = useCallback(async () => {
    try {
      const { code, data } = await getUserInfo();
      if (Number(code) !== 200) return;
      const { user, permissions, menuList } = data;
      dispatch(setUserInfo(user));
      dispatch(setMenuList(menuList || []));
      dispatch(setPermissions(permissions));
    } catch (err) {
      console.error("获取用户数据失败:", err);
      dispatch(setPermissions([]));
    } finally {
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      fetchUserInfo();
    } else {
      navigator("login");
    }
  }, [token]);

  return (
    <ConfigProvider>
      <App>
        <AppPage />
      </App>
    </ConfigProvider>
  );
}

// Router 选择
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

// 导出组件，基于路由设置选择 HashRouter 或 BrowserRouter
export default () => {
  return LayoutSetting.route === "hash" ? (
    <GenHashRouter />
  ) : (
    <GenBrowserRouter />
  );
};
