import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Skeleton, message } from "antd";
import { useCommonstore } from "@/stores";
import { useNavigate, useOutlet } from "react-router-dom";
import { toggleCollapsed, togglePhone } from "@/stores/menu";
import { useLocation } from "react-router-dom";
import { useCommonStore } from "@/stores";
import type { AppDispatch } from "@/stores";
import { STORAGE_AUTHORIZE_KEY } from "@/composables/authorization";
import { getLocalInfo } from "@/utils/local";
import { setMenuList, setPermissions, setUserInfo } from "@/stores/user";
import { debounce } from "lodash";
import { getUserInfo } from "@/api/user";
import KeepAlive from "react-activation";
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
  /** 获取用户信息和权限 */
  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      const { code, data } = await getUserInfo();
      if (Number(code) !== 200) return;
      const { user, permissions, menuList } = data;
      dispatch(setUserInfo(user));
      dispatch(setMenuList(menuList || []));
      dispatch(setPermissions(permissions));
      navigate("/index");
    } catch (err) {
      console.error("获取用户数据失败:", err);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 如果没有token，则返回登录页
    if (!token) {
      navigate("/login");
    } else {
      navigate("/index");
    }
  }, [navigate, token, userId]);

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
    <div id="layout">
      <KeepAlive id={uri} name={uri}>
        {outlet}
      </KeepAlive>
    </div>
  );
}

export default Layout;
