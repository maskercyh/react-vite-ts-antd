import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import I18n from "@/components/I18n";
import Theme from "@/components/Theme";
export default function Header() {
  const { isCollapsed, isMaximize, username, nav } = useCommonStore();
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <div
        className="text-lg cursor-pointer"
        onClick={() => dispatch(toggleCollapsed(!isCollapsed))}
      >
        {isCollapsed && <MenuUnfoldOutlined />}
        {!isCollapsed && <MenuFoldOutlined />}
      </div>
      <I18n />
      <Theme />
      {/* <Breadcrumb
        items={[
          {
            title: "Home",
          },
          {
            title: <a href="">Application Center</a>,
          },
          {
            title: <a href="">Application List</a>,
          },
          {
            title: "An Application",
          },
        ]}
      /> */}
    </>
  );
}
