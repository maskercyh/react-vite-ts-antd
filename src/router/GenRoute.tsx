import type { RouteObject } from "react-router-dom";
import baseRoutes from "./baseRouter";
import { useCommonStore } from "@/stores";

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
  const element = useRoutes(routes);

  return <>{element}</>;
}

export default GenRoute;
