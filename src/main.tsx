import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/index.css";
import Router from "./router";
import "uno.css";

// 状态管理
import { Provider } from "react-redux";
import { store } from "./stores";

import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from "@ant-design/cssinjs"; // 兼容低版本浏览器
// import { setupI18n } from './locales'
// 时间设为中文
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyleProvider
      hashPriority="high"
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <Provider store={store}>
        <Router />
      </Provider>
    </StyleProvider>
  </StrictMode>
);
