import type { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  setThemeValue,
  THEME_KEY,
  LAYOUT_KEY,
  setLayout,
} from "@/stores/public";
import type { ThemeType, LayoutType } from "#/public";
import { STORAGE_AUTHORIZE_KEY } from "@/stores/public";
import { getLocalInfo } from "@/utils/local";
import type { AppDispatch } from "@/stores";
import { useDispatch } from "react-redux";
import { getUserInfo } from "@/api/user";
import Loading from "~@/components/Loading";
import { setPermissions, setUserInfo, setRouteList } from "@/stores/user";
import { setMenuList } from "@/stores/menu";
import { toRoute, toMenu } from "@/utils/menu";
interface ReactNode {
  children?: ReactNode;
}

const BeforeRouter: FC<ReactNode> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = getLocalInfo(STORAGE_AUTHORIZE_KEY);
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  if (!token) {
    navigate("/login");
    return;
  }
  const layout = (localStorage.getItem(LAYOUT_KEY) || "side") as LayoutType;
  useEffect(() => {
    if (!layout) {
      localStorage.setItem(LAYOUT_KEY, "side");
    }

    dispatch(setLayout(layout));
  }, [layout]);
  const themeCache = (localStorage.getItem(THEME_KEY) || "light") as ThemeType;
  useEffect(() => {
    if (!themeCache) {
      localStorage.setItem(THEME_KEY, "light");
    }
    if (themeCache === "dark") {
      document.body.className = "dark";
    }
    dispatch(setThemeValue(themeCache === "dark" ? "dark" : "light"));
  }, [themeCache]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { code, data } = await getUserInfo();
        if (Number(code) !== 200) return;

        const { user, permissions, menuList } = data;
        dispatch(setUserInfo(user));
        dispatch(setRouteList(toRoute(menuList) || []));
        dispatch(setMenuList(toMenu(menuList) || []));
        dispatch(setPermissions(permissions));

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, dispatch]);

  if (!token && pathname !== "/login") {
    return navigate("/login");
  } else {
    if (loading) {
      return <Loading />;
    }
    return children;
  }
};

export default memo(BeforeRouter);
