import { HashRouter, BrowserRouter } from "react-router-dom";
import { App, ConfigProvider } from "antd";
import LayoutSetting from "@/config/default-setting";
import { AliveScope } from "react-activation";
import Loading from "~@/components/Loading";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import GenRoute from "./GenRoute";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
const { defaultAlgorithm, darkAlgorithm } = theme;

function AppConent() {
  const { theme, configSetting } = useCommonStore();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <ConfigProvider
      locale={currentLanguage === "en" ? enUS : zhCN}
      theme={{
        algorithm: [theme === "dark" ? darkAlgorithm : defaultAlgorithm],
        token: {
          colorPrimary: configSetting.colorPrimary,
        },
      }}
    >
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
  return LayoutSetting.routeType === "hash" ? (
    <HashRouter>
      <AppConent />
    </HashRouter>
  ) : (
    <BrowserRouter>
      <AppConent />
    </BrowserRouter>
  );
};
