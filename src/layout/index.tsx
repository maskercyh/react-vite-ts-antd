import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { toggleCollapsed, togglePhone } from "@/stores/menu";
import { useLocation } from "react-router-dom";
import { useCommonStore } from "@/stores";
import type { AppDispatch } from "@/stores";
import { debounce } from "lodash";
import Menu from "./components/Menu";
import Header from "./components/Header";
import { KeepAlive } from "react-activation";
import styles from "./index.module.less";
function Layout() {
  const { menuList, isMaximize, isCollapsed, isPhone, isRefresh } =
    useCommonStore();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { pathname, search } = useLocation();
  const uri = pathname + search;
  const [messageApi, contextHolder] = message.useMessage();

  // 监测是否需要刷新
  useEffect(() => {
    if (pathname === "/") {
      navigate(menuList[0].path);
    }
    // versionCheck(messageApi);
  }, [pathname]);

  /** 判断是否是手机端 */
  const handleIsPhone = debounce(() => {
    const isPhone = window.innerWidth <= 768;
    // 手机首次进来收缩菜单
    if (isPhone) dispatch(toggleCollapsed(true));
    dispatch(togglePhone(isPhone));
  }, 500);

  // 监听是否是手机端
  useEffect(() => {
    window.addEventListener("resize", handleIsPhone);
    return () => {
      window.removeEventListener("resize", handleIsPhone);
    };
  }, []);
  return (
    <div className={`${styles["app-layout"]}`}>
      <div className={`${styles["app-container-wrap"]}`}>
        <Menu />
        <div
          className={`
          ${styles["app-main"]} 
          ${isCollapsed ? styles["is-collapse-main"] : ""}
          `}
        >
          <Header />
          <KeepAlive id={uri} name={uri}>
            <Outlet />
          </KeepAlive>
        </div>
      </div>
    </div>
  );
}

export default Layout;
