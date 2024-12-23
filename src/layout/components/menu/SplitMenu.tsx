import type { MenuProps } from "antd";
import { useCommonStore } from "@/stores";
import styles from "@/layout/index.module.less";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import { setSpiltMenu } from "@/stores/menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { menuList, routeList, isCollapsed, configSetting, isPhone, theme } =
    useCommonStore();
  const { pathname } = useLocation();

  const [selectKey, setSelectKey] = useState<string>("");
  const [splitMenu, setSplitMenu] = useState<any[]>([]);

  useEffect(() => {
    // 计算新的 splitMenu，只在 menuList 发生变化时更新
    const updatedMenu = menuList.map((item) => ({
      ...item,
      children: [], // 设置空的子菜单项
    }));
    setSplitMenu(updatedMenu);

    // 查找当前选中的菜单项
    let current = menuList.findIndex((item) => {
      if (item.path !== "/") {
        return pathname.startsWith(item.path);
      }
      return false;
    });

    // 如果 pathname 是根路径，直接设置 current 为 0
    // if (pathname === "/") {
    //   current = 0;
    // }

    // 确保 current 是有效的
    if (current !== -1 && menuList[current]) {
      if (pathname === "/") {
        const mentData = menuList[0];
        const { key } = mentData;
        setSelectKey(key); // 更新选中的菜单项
        dispatch(setSpiltMenu(mentData.children ?? [])); // 更新子菜单
      } else {
        const mentData = menuList[current];
        const { key } = mentData;
        setSelectKey(key); // 更新选中的菜单项
        dispatch(setSpiltMenu(mentData.children ?? [])); // 更新子菜单
      }
    }
  }, [pathname, menuList, dispatch]);

  console.log(splitMenu);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("Menu item clicked:", e.key);
    // navigate(e.key); // 你可以根据菜单项的 key 来进行导航
  };

  return (
    <Menu
      theme={theme}
      className={classNames(styles["side-bar-menu-list"], {
        [styles["side-bar-menu-list-horizontal"]]:
          configSetting.layout !== "side",
        [styles["global-menu-list"]]: isPhone,
      })}
      selectedKeys={[selectKey]}
      onClick={onClick}
      mode="horizontal"
      items={splitMenu} // 使用计算后的 splitMenu
    />
  );
};

export default App;
