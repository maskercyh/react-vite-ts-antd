import type { MenuProps } from "antd";
import { useCommonStore } from "@/stores";
import { findParentMenuKey } from "@/utils/menu";
const App: React.FC = () => {
  const { menuList, routeList } = useCommonStore();
  const { pathname } = useLocation();
  const [selectKey, setSelectKey] = useState<string>("");
  const [openKeys, setopenKeys] = useState<string[]>([]);

  useEffect(() => {
    const current = routeList.findIndex((item) => item.path === pathname);
    if (current == -1) return;
    const { key, path } = routeList[current];
    setopenKeys(findParentMenuKey(menuList, path));
    setSelectKey(key);
    console.log(key);
  }, []);

  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    setopenKeys(e.keyPath);
    setSelectKey(e.key);
    console.log(e.keyPath);
    console.log(e);
    const current = routeList.findIndex((item) => item.key === e.key);
    if (current === -1) return;
    const { path } = routeList[current];
    navigate(path);
  };
  const onOpenChange: MenuProps["onOpenChange"] = (newOpenKeys) => {
    setopenKeys(newOpenKeys);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      selectedKeys={[selectKey]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={menuList}
    />
  );
};

export default App;
