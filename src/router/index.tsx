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
<<<<<<< HEAD
import Dashboard from "~@/view/dashboard";
import Loading from "~@/components/loading";
import { setMenuList, setPermissions, setUserInfo } from "@/stores/user";
import { useSelector, useDispatch } from "react-redux";
import { useCommonStore } from "@/stores";
import KeepAlive from "react-activation";
// 动态导入页面
const pages: Record<string, () => Promise<any>> = import.meta.glob(
  "../view/**/*.tsx"
);

let baseRoutes: RouteObject[] = [
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
  // const { menuList } = useCommonStore();
  const menuList = useSelector((state: any) => state.user.menuList);
  const [dynamicRoutes, setDynamicRoutes] = useState<RouteObject[]>([]); // 存储动态加载的路由
  const [isLoading, setisLoading] = useState<Boolean>(true);
  // 监听 menuList 更新
  useEffect(() => {
    if (menuList.length > 0) {
      // 动态生成路由
      const generatedRoutes = menuList.map((item: any) => {
        const loadComponent = pages[`../view/${item.element}.tsx`];
        const Component = lazy(() => loadComponent());
        // const Component = lazy(
        //   () => loadComponent()
        //   //() =>  new Promise((resolve) => {
        //   // setTimeout(() => {
        //   // loadComponent().then(resolve);
        //   // }, 2000); // 模拟2秒延迟加载
        //   // })
        // );

        return {
          path: item.path,
          element: <Component />,
        };
      });
      generatedRoutes.push({ path: "/loading", element: <Loading /> });

      setDynamicRoutes([
        {
          path: "/",
          element: <Layout />,
          children: generatedRoutes, // 嵌套动态路由
        },
      ]);
      // setDynamicRoutes(generatedRoutes);
    }

    setisLoading(false);
  }, [menuList]); // 当 menuList 更新时重新计算路由
  // if (isLoading) {
  //   return <Loading />;
  // }
  console.log(dynamicRoutes);
  // 加载完数据后，渲染路由
  return useRoutes([...dynamicRoutes, ...baseRoutes]);
}
// Page 组件外部包装
function GenPage() {
=======
import Loading from "~@/components/Loading";
import { setMenuList, setPermissions, setUserInfo } from "@/stores/user";
import { useSelector, useDispatch } from "react-redux";
import AppPage from "./App";
// Page 组件外部包装
function GenPage() {
  const navigator = useNavigate();
>>>>>>> 1b537fcc2013b31ee2f1bd5be23e0638ef6b57ae
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
<<<<<<< HEAD
        <AliveScope>
          <Suspense fallback={<Loading />}>
            <Page />
          </Suspense>
        </AliveScope>
=======
        <AppPage />
>>>>>>> 1b537fcc2013b31ee2f1bd5be23e0638ef6b57ae
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
