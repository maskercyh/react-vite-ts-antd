import { memo } from "react";
import type { FC, ReactNode } from "react";
import { useCallback, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { STORAGE_AUTHORIZE_KEY } from "@/composables/authorization";
import { getLocalInfo } from "@/utils/local";
import type { AppDispatch } from "@/stores";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "@/api/user";
import { setMenuList, setPermissions, setUserInfo } from "@/stores/user";
interface IProps {
  children?: ReactNode;
}

const BeforeRouter: FC<IProps> = ({ children }) => {
  const { pathname } = useLocation();
  const token = getLocalInfo(STORAGE_AUTHORIZE_KEY);
  const dispatch: AppDispatch = useDispatch();
  // 获取用户信息和权限
  const fetchUserInfo = useCallback(async () => {
    try {
      const { code, data } = await getUserInfo();
      if (Number(code) !== 200) return;
      const { user, permissions, menuList } = data;
      dispatch(setUserInfo(user));
      dispatch(setMenuList(menuList || []));
      dispatch(setPermissions(permissions));
    } catch (err) {
      console.error("获取用户数据失败:", err);
      dispatch(setPermissions([]));
    } finally {
    }
  }, [dispatch]);
  useEffect(() => {
    if (token) {
      fetchUserInfo();
    }
  }, [token]);

  if (!token && pathname !== "/login") {
    return <Navigate to="/login" />;
  } else {
    <Navigate to="/index" />;
    return children;
  }
};

export default memo(BeforeRouter);
