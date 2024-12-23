import type { MenuProps } from "antd";
import { useCommonStore } from "@/stores";
import { findParentMenuKey } from "@/utils/menu";
import styles from "@/layout/index.module.less";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import { setActiveKey, addTabs } from "@/stores/tabs";
import { MenuType } from "#/menu";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    menuList,
    routeList,
    isCollapsed,
    configSetting,
    isPhone,
    theme,
    spiltMenu,
  } = useCommonStore();
  const { pathname } = useLocation();

  const [selectKey, setSelectKey] = useState<string>("");
  const [openKeys, setopenKeys] = useState<string[]>([]);
  const [menuData, setmenuData] = useState<MenuType[]>([]);

  useEffect(() => {
    if (configSetting.layout === "mix") {
      setmenuData(spiltMenu);
    } else {
      setmenuData(menuList);
    }
  }, [menuList, configSetting, spiltMenu]);

  useEffect(() => {
    const current = routeList.findIndex((item) => item.path === pathname);
    if (current == -1) return;
    const { key, path } = routeList[current];
    if (configSetting.layout === "side")
      setopenKeys(findParentMenuKey(menuList, path));
    setSelectKey(key);
  }, [pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    const current = routeList.findIndex((item) => item.key === e.key);
    if (current === -1) return;
    const { path, label } = routeList[current];
    dispatch(addTabs({ key: path, label }));
    dispatch(setActiveKey(path));
    navigate(path);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (newOpenKeys) => {
    if (!isPhone) setopenKeys(newOpenKeys);
  };
  return (
    <Menu
      theme={theme}
      className={`
        ${styles["side-bar-menu-list"]}
        ${
          configSetting.layout === "top" &&
          styles["side-bar-menu-list-horizontal"]
        }
        ${styles["side-bar-menu-list-collapsed"]}
        ${isPhone && styles["global-menu-list"]}
    `}
      onClick={onClick}
      selectedKeys={[selectKey]}
      onOpenChange={onOpenChange}
      mode={configSetting.layout != "top" || isPhone ? "inline" : "horizontal"}
      items={menuData}
      {...(configSetting.layout !== "top" &&
        !isPhone && {
          inlineCollapsed: isCollapsed,
        })}
      {...(configSetting.layout != "top" && { openKeys: openKeys })}
    />
  );
};

export default App;
