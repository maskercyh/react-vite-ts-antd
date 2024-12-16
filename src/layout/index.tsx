import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { toggleCollapsed, togglePhone } from "@/stores/menu";
import { useLocation } from "react-router-dom";
import { useCommonStore } from "@/stores";
import type { AppDispatch } from "@/stores";
import SettingDrawer from "./components/SettingDrawer";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import TabsTop from "./components/TabsTop";
import { KeepAlive } from "react-activation";
import styles from "./index.module.less";
import { AnimatePresence, motion } from "framer-motion";
import { Watermark } from "antd";
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

  return (
    <div className={`${styles["app-layout"]}`}>
      <section
        className={`
          ${styles["app-container-wrap"]}
        `}
      >
        {configSetting.layout === "side" && !isPhone && <SideMenu />}
        <section
          className={`
            ${styles["app-main-wrap"]} 
            ${
              configSetting.layout === "side" &&
              !isPhone &&
              styles["app-main-side-menu"]
            }
            ${isCollapsed && !isPhone ? styles["is-collapse-main"] : ""}
          `}
        >
          <Header />
          <TabsTop />
          <Watermark
            className="h-full flex flex-col flex-1"
            content={
              !configSetting.watermark ? "" : configSetting.title ?? "no title"
            }
          >
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
          </Watermark>
        </section>
      </section>
      {configSetting.drawerSetting && <SettingDrawer />}
    </div>
  );
}

export default Layout;
