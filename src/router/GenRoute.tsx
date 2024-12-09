import { useRoutes } from "react-router-dom";
import { lazy, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RouteObject } from "react-router-dom";
import baseRoutes from "./baseRouter";
import NotFound from "~@/view/404";
import Loading from "~@/components/Loading";
// 动态导入页面
const pages: Record<string, () => Promise<any>> = import.meta.glob(
  "../view/**/*.tsx"
);

function GenRoute() {
  const menuList = useSelector((state: any) => state.user.menuList);
  const [dynamicRoutes, setDynamicRoutes] = useState<RouteObject[]>([]); // 存储动态路由配置
  // 监听 menuList 更新
  useEffect(() => {
    const generatedRoutes = menuList.map((item: any) => {
      const loadComponent = pages[`../view/${item.element}.tsx`];
      const Component = lazy(() => loadComponent());
      return {
        path: item.path,
        element: <Component />,
      };
    });
    setDynamicRoutes(generatedRoutes);
  }, [menuList]);

  const routes: any = [
    {
      ...baseRoutes[0],
      children: [...dynamicRoutes],
    },
    ...baseRoutes.slice(1),
  ];
  const element = useRoutes(routes);

  return <>{element}</>;
}

export default GenRoute;
