import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import LangSelect from "~@/components/LangSelect";
import UserAvater from "~@/components/UserAvater";
import styles from "../index.module.less";
import LogoImg from "@/assets/react.svg";
import { MenuFoldOutlined } from "@ant-design/icons";
import Menu from "./Menu";
import SideMenu from "./SideMenu";
import { Drawer } from "antd";
export default function Header() {
  const dispatch: AppDispatch = useDispatch();
  const { isCollapsed, isMaximize, username, isPhone, configSetting } =
    useCommonStore();
  const [open, setOpen] = useState<boolean>(false);
  const showMenu = () => {
    setOpen(true);
  };

  return (
    <header
      className={`
        ${styles["header-container-wrap"]}
      `}
    >
      <div
        className={`
          ${styles["header-container"]}
        `}
      >
        {(configSetting.layout === "top" || isPhone) && (
          <div
            className={`
          ${styles["logo-space"]}
          mr-25px
        `}
          >
            <a>
              <img src={LogoImg} alt="" />
              {!isCollapsed && <span>{configSetting.title}</span>}
            </a>
          </div>
        )}
        {isPhone && (
          <>
            <div
              className={`
          phone-menu-button cursor-pointer text-18px
        `}
              onClick={showMenu}
            >
              <MenuFoldOutlined />
            </div>
            <Drawer
              width={240}
              styles={{ body: { padding: 0 } }}
              closeIcon={false}
              placement="left"
              open={open}
              onClose={() => setOpen(false)}
            >
              <SideMenu />
            </Drawer>
          </>
        )}
        <div
          className={`flex-1
      `}
        >
          {configSetting.layout === "top" && !isPhone && <Menu />}
        </div>
        <div
          className={`
            ${styles["header-handle-space"]}
          `}
        >
          <LangSelect />
          <UserAvater />
        </div>
      </div>
    </header>
  );
}
