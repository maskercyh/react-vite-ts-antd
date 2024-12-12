import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { toggleCollapsed, togglePhone } from "@/stores/menu";
import { useLocation } from "react-router-dom";
import { useCommonStore } from "@/stores";
import type { AppDispatch } from "@/stores";
import { debounce } from "lodash";
import SettingDrawer from "./components/SettingDrawer";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import { KeepAlive } from "react-activation";
import styles from "./index.module.less";
import { AnimatePresence, motion } from "framer-motion";

function Layout() {
  const {
    menuList,
    isMaximize,
    isCollapsed,
    isPhone,
    isRefresh,
    configSetting,
  } = useCommonStore();
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
      <section
        className={`
          ${styles["app-container-wrap"]}
        `}
      >
        {configSetting.layout == "side" && <SideMenu />}
        <section
          className={`
            ${styles["app-main-wrap"]} 
            ${configSetting.layout == "side" && styles["app-main-side-menu"]}
            ${isCollapsed ? styles["is-collapse-main"] : ""}
          `}
        >
          <Header />
          <main
            className={`
              ${styles["app-main"]}
            `}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={uri}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <KeepAlive id={uri} name={uri}>
                  <Outlet />
                </KeepAlive>
              </motion.div>
            </AnimatePresence>
          </main>
        </section>
      </section>
      {configSetting.drawerSetting && <SettingDrawer />}
    </div>
  );
}

export default Layout;
