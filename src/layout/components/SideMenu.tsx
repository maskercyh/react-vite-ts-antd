import type { MenuProps } from "antd";
import { useCommonStore } from "@/stores";
import { findParentMenuKey } from "@/utils/menu";
import styles from "../index.module.less";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import { setActiveKey, addTabs } from "@/stores/tabs";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { menuList, routeList, isCollapsed, tabs } = useCommonStore();
  const { pathname } = useLocation();

  const [selectKey, setSelectKey] = useState<string>("");
  const [openKeys, setopenKeys] = useState<string[]>([]);

  useEffect(() => {
    const current = routeList.findIndex((item) => item.path === pathname);
    if (current == -1) return;
    const { key, path } = routeList[current];
    setopenKeys(findParentMenuKey(menuList, path));
    setSelectKey(key);
  }, []);

  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    setopenKeys(e.keyPath);
    setSelectKey(e.key);
    const current = routeList.findIndex((item) => item.key === e.key);
    if (current === -1) return;
    const { path, key } = routeList[current];
    dispatch(addTabs({ key, path }));
    dispatch(setActiveKey(key));
    navigate(path);
  };
  const onOpenChange: MenuProps["onOpenChange"] = (newOpenKeys) => {
    setopenKeys(newOpenKeys);
  };

  return (
    <aside
      className={`
        ${styles["side-bar"]}
        ${isCollapsed && styles["side-bar-collapsed"]}
      `}
    >
      <div
        className={`
        ${styles["side-bar-logo"]}
      `}
      >
        logo
      </div>
      <div
        className={`
          flex-1 of-x-hidden of-y-auto scrollbar
          ${styles["side-bar-menu"]}
        `}
      >
        <Menu
          className={`
          ${styles["side-bar-menu-list"]}
        `}
          onClick={onClick}
          selectedKeys={[selectKey]}
          inlineCollapsed={isCollapsed}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode="inline"
          items={menuList}
        />
      </div>
      <div
        className={`
          ${styles["side-bar-collapsed-box"]}
        `}
        onClick={() => dispatch(toggleCollapsed(!isCollapsed))}
      >
        <div
          className={`
            ${styles["side-bar-collapsed-button"]}
          `}
        >
          {isCollapsed && <MenuUnfoldOutlined />}
          {!isCollapsed && <MenuFoldOutlined />}
        </div>
      </div>
    </aside>
  );
};

export default App;
