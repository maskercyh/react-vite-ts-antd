import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import styles from "../index.module.less";
import { useDispatch } from "react-redux";
import Theme from "@/components/Theme";
import { setLayout, setColorPrimary, LAYOUT_KEY } from "@/stores/public";
import type { LayoutType } from "#/public";
import type { AppDispatch } from "@/stores";
const SettingDrawer: React.FC = () => {
  const { configSetting } = useCommonStore();
  const dispatch: AppDispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const show = () => {
    setOpen(true);
  };

  const themeColorSet = (params: any) => () => {
    dispatch(setColorPrimary(params));
  };
  const layoutSet = (params: LayoutType) => () => {
    localStorage.setItem(LAYOUT_KEY, params);
    dispatch(setLayout(params));
  };

  return (
    <div>
      <div
        onClick={show}
        className={`
            ${styles["app-drawer-setting-handle"]}
            `}
        style={{ backgroundColor: configSetting.colorPrimary }}
      >
        <SettingOutlined style={{ fontSize: "20px" }} />
      </div>
      <Drawer
        closable
        destroyOnClose
        title={"主题配置"}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Theme />
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={layoutSet("top")}
        >
          top
        </Button>
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={layoutSet("side")}
        >
          side
        </Button>

        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={themeColorSet("blue")}
        >
          blue
        </Button>
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={themeColorSet("red")}
        >
          red
        </Button>
      </Drawer>
    </div>
  );
};

export default SettingDrawer;
