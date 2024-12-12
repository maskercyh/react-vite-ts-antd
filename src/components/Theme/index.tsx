import type { AppDispatch } from "@/stores";
import { setThemeValue, THEME_KEY } from "@/stores/public";
import type { ThemeType } from "#/public";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useAliveController } from "react-activation";
function Theme() {
  const { t } = useTranslation();
  const { clear, refresh, getCachingNodes } = useAliveController();
  const dispatch: AppDispatch = useDispatch();
  const themeCache = (localStorage.getItem(THEME_KEY) || "theme") as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(themeCache);

  useEffect(() => {
    if (!themeCache) {
      localStorage.setItem(THEME_KEY, "light");
    }
    setTheme(themeCache === "dark" ? "dark" : "light");
  }, [themeCache]);

  /** 刷新全部keepalive */
  const refreshAllKeepalive = () => {
    const cacheNodes = getCachingNodes();
    for (let i = 0; i < cacheNodes?.length; i++) {
      const { name } = cacheNodes[i];
      if (name) refresh(name);
    }
  };

  /**
   * 处理更新
   * @param type - 主题类型
   */
  const onChange = (type: ThemeType) => {
    localStorage.setItem(THEME_KEY, type);
    dispatch(setThemeValue(type));
    setTheme(type);
    clear();
    refreshAllKeepalive();
    switch (type) {
      case "dark":
        document.documentElement.className = "dark";
        break;

      default:
        document.documentElement.className = "light";
        break;
    }
  };

  return (
    <Tooltip title={t("public.themes")}>
      <div className="flex items-center justify-center text-lg mr-4 cursor-pointer">
        {theme}
        {theme === "light"}
        {theme === "light" && (
          <button onClick={() => onChange("dark")}>dark</button>
        )}
        {theme !== "light" && (
          <button
            icon="mdi-moon-waning-crescent"
            onClick={() => onChange("light")}
          >
            light
          </button>
        )}
      </div>
    </Tooltip>
  );
}

export default Theme;
