import { HashRouter, BrowserRouter } from "react-router-dom";
import { App, ConfigProvider, message } from "antd";
import LayoutSetting from "@/config/default-setting";
import { useTranslation } from "react-i18next";
import GenerRoute from "./GenerRoute";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import { useCommonStore } from "@/stores";

const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;

function AppContent() {
  const { theme, configSetting } = useCommonStore();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  console.log(currentLanguage);
  const algorithm = [theme === "dark" ? darkAlgorithm : defaultAlgorithm];
  if (configSetting.compact) algorithm.push(compactAlgorithm);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ConfigProvider
      locale={currentLanguage === "en" ? enUS : zhCN}
      theme={{
        algorithm: algorithm,
        token: {
          colorPrimary: configSetting.colorPrimary,
        },
      }}
    >
      <App>
        <GenerRoute />
      </App>
    </ConfigProvider>
  );
}

// Main component for handling routing (HashRouter or BrowserRouter)
export default () => {
  return LayoutSetting.routeType === "hash" ? (
    <HashRouter>
      <AppContent />
    </HashRouter>
  ) : (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
