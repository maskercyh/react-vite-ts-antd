import { useCommonStore } from "@/stores";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Menu from "@/layout/components/menu/Menu";
import Logo from "@/layout/components/Logo";
import styles from "@/layout/index.module.less";
import LogoImg from "@/assets/react.svg";
const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { configSetting, isCollapsed, isPhone } = useCommonStore();

  return (
    <aside
      className={`
        ${styles["side-bar"]}
        ${isCollapsed && styles["side-bar-collapsed"]}
      `}
    >
      <div
        className={`
          p-10px
          ${styles["logo-space"]}
        `}
      >
        <a>
          <img src={LogoImg} alt="" />
          {(!isCollapsed || isPhone) && <span>{configSetting.title}</span>}
        </a>
      </div>
      <div
        className={`
          flex-1 of-x-hidden of-y-auto scrollbar
          ${styles["side-bar-menu"]}
        `}
      >
        <Menu />
      </div>
      {!isPhone && (
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
      )}
    </aside>
  );
};

export default App;
