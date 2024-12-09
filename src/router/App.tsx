import { HashRouter, useRoutes, BrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import Login from "@/view/user/login";
import NotFound from "@/view/404";
import Layout from "@/layout";
import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import Loading from "~@/components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { AliveScope, KeepAlive } from "react-activation";
// 动态导入页面
const pages: Record<string, () => Promise<any>> = import.meta.glob(
  "../view/**/*.tsx"
);

let baseRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
];

function App() {
  const menuList = useSelector((state: any) => state.user.menuList);
  const [dynamicRoutes, setDynamicRoutes] = useState<RouteObject[]>([]); // 存储动态加载的路由
  // 监听 menuList 更新
  useEffect(() => {
    if (menuList.layoutRoute.length > 0) {
      const generatedRoutes = menuList.layoutRoute.map((item: any) => {
        const loadComponent = pages[`../view/${item.element}.tsx`];
        const Component = lazy(() => loadComponent());
        return {
          path: item.path,
          element: <Component />,
        };
      });
      const route = menuList.route.map((item: any) => {
        const loadComponent = pages[`../view/${item.element}.tsx`];
        const Component = lazy(() => loadComponent());
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
        ...route,
      ]);
    } else {
      setDynamicRoutes([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "*",
              element: <NotFound />,
            },
          ], // 嵌套动态路由
        },
      ]);
    }
  }, [menuList]); // 当 menuList 更新时重新计算路由
  return (
    <AliveScope>
      <Suspense fallback={<Loading />}>
        {useRoutes([...dynamicRoutes, ...baseRoutes])}
      </Suspense>
    </AliveScope>
  );
}

export default App;
