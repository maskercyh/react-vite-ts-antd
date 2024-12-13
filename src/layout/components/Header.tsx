import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import LangSelect from "~@/components/LangSelect";
import UserAvater from "~@/components/UserAvater";
import styles from "../index.module.less";
export default function Header() {
  const { isCollapsed, isMaximize, username, nav } = useCommonStore();
  const dispatch: AppDispatch = useDispatch();
  return (
    <header
      className={`
        ${styles["header-container"]}
      `}
    >
      <div
        className={`
        ${styles["header-left"]}
      `}
      >
        <Breadcrumb
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
        />
      </div>
      <div
        className={`
            ${styles["header-right"]}
          `}
      >
        <LangSelect />
        <UserAvater />
      </div>
    </header>
  );
}
