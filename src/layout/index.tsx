import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Skeleton, message } from "antd";
import { useCommonstore } from "@/stores";
import { useNavigate, useOutlet, Outlet } from "react-router-dom";
import { toggleCollapsed, togglePhone } from "@/stores/menu";
import { useLocation } from "react-router-dom";
import { useCommonStore } from "@/stores";
import type { AppDispatch } from "@/stores";
import { STORAGE_AUTHORIZE_KEY } from "@/composables/authorization";
import { getLocalInfo } from "@/utils/local";
import { debounce } from "lodash";
import Menu from "./components/Menu";
import { AliveScope, KeepAlive } from "react-activation";
function Layout() {
  const {
    permissions,
    menuList,
    userId,
    isMaximize,
    isCollapsed,
    isPhone,
    isRefresh,
  } = useCommonStore();
  const navigate = useNavigate();
  const outlet = useOutlet();
  const dispatch: AppDispatch = useDispatch();
  const token = getLocalInfo(STORAGE_AUTHORIZE_KEY);
  const { pathname, search } = useLocation();
  const uri = pathname + search;
  const [isLoading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  // 监测是否需要刷新
  useEffect(() => {
    // versionCheck(messageApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="layout" className={`flex`}>
      <Menu />
      {/* <KeepAlive id={uri} name={uri} enabled={false}> */}
      <Outlet />
      {/* </KeepAlive> */}
    </div>
  );
}

export default Layout;
