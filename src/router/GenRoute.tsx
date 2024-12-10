import { useRoutes } from "react-router-dom";
import { lazy, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RouteObject } from "react-router-dom";
import baseRoutes from "./baseRouter";
import { useCommonStore } from "@/stores";
// 动态导入页面
const pages: Record<string, () => Promise<any>> = import.meta.glob(
  "../view/**/*.tsx"
);

function GenRoute() {
  const { routeList } = useCommonStore();
  const [dynamicRoutes, setDynamicRoutes] = useState<RouteObject[]>([]); // 存储动态路由配置
  // 监听 routeList 更新
  useEffect(() => {
    setDynamicRoutes(routeList);
  }, [routeList]);

  const routes: any = [
    {
      ...baseRoutes[0],
      children: [...dynamicRoutes],
    },
    ...baseRoutes.slice(1),
  ];
  console.log(routes);
  const element = useRoutes(routes);

  return <>{element}</>;
}

export default GenRoute;
