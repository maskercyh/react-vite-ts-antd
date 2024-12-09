import { HashRouter, BrowserRouter } from "react-router-dom";
import { App, ConfigProvider } from "antd";
import LayoutSetting from "@/config/default-setting";
import { AliveScope } from "react-activation";
import Loading from "~@/components/Loading";
import { Suspense } from "react";
import GenRoute from "./GenRoute";
// Page 组件外部包装
function AppConent() {
  return (
    <ConfigProvider>
      <App>
        <AliveScope>
          <Suspense fallback={<Loading />}>
            <GenRoute />
          </Suspense>
        </AliveScope>
      </App>
    </ConfigProvider>
  );
}

// 导出组件，基于路由设置选择 HashRouter 或 BrowserRouter
export default () => {
  return LayoutSetting.route === "hash" ? (
    <HashRouter>
      <AppConent />
    </HashRouter>
  ) : (
    <BrowserRouter>
      <AppConent />
    </BrowserRouter>
  );
};
