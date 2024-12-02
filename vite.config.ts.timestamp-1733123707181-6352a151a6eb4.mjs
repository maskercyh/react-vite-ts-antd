var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// vite.config.ts
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as process from "node:process";
import { loadEnv } from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/vite@5.4.10_@types+node@20.11.30_less@4.2.0_terser@5.36.0/node_modules/vite/dist/node/index.js";

// plugins/index.ts
import AutoImport from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/unplugin-auto-import@0.16.7_@vueuse+core@10.11.1_vue@3.5.13_typescript@5.6.3__/node_modules/unplugin-auto-import/dist/vite.js";
import GenerateConfig from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/unplugin-config@0.1.5_esbuild@0.21.5_vite@5.4.10_@types+node@20.11.30_less@4.2.0_terser@5.36.0_/node_modules/unplugin-config/dist/vite.js";
import Components from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/unplugin-react-components@0.1.4_@types+react@18.3.12_react@18.3.1/node_modules/unplugin-react-components/dist/vite.js";
import Unocss from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/unocss@0.57.7_postcss@8.4.49_vite@5.4.10_@types+node@20.11.30_less@4.2.0_terser@5.36.0_/node_modules/unocss/dist/vite.mjs";
import { presetUno, presetAttributify, presetIcons } from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/unocss@0.57.7_postcss@8.4.49_vite@5.4.10_@types+node@20.11.30_less@4.2.0_terser@5.36.0_/node_modules/unocss/dist/index.mjs";

// plugins/constants.ts
var GLOB_CONFIG_FILE_NAME = "_app.config.js";
var OUTPUT_DIR = "dist";

// plugins/vite-build-info.ts
import { readdir, stat } from "node:fs";
import dayjs from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";
import duration from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/plugin/duration.js";
import pkg from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/picocolors@1.0.0/node_modules/picocolors/picocolors.js";
var { green, blue, bold } = pkg;
dayjs.extend(duration);
var fileListTotal = [];
function recursiveDirectory(folder, callback) {
  readdir(folder, (err, files) => {
    if (err)
      throw err;
    let count = 0;
    const checkEnd = () => {
      ++count === files.length && callback();
    };
    files.forEach((item) => {
      stat(`${folder}/${item}`, async (err2, stats) => {
        if (err2)
          throw err2;
        if (stats.isFile()) {
          fileListTotal.push(stats.size);
          checkEnd();
        } else if (stats.isDirectory()) {
          recursiveDirectory(`${folder}/${item}/`, checkEnd);
        }
      });
    });
    files.length === 0 && callback();
  });
}
function sum(arr) {
  return arr.reduce((t, c) => {
    return t + c;
  }, 0);
}
function formatBytes(a, b) {
  if (a === 0)
    return "0 Bytes";
  const c = 1024;
  const d = b || 2;
  const e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const f = Math.floor(Math.log(a) / Math.log(c));
  return `${Number.parseFloat((a / c ** f).toFixed(d))} ${e[f]}`;
}
function viteBuildInfo(name) {
  let config;
  let startTime;
  let endTime;
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    buildStart() {
      console.log(
        bold(
          green(
            `\u{1F44F}\u6B22\u8FCE\u4F7F\u7528${blue(`[${name}]`)}\uFF0C\u73B0\u5728\u6B63\u5168\u529B\u4E3A\u60A8${config.command === "build" ? "\u6253\u5305" : "\u7F16\u8BD1"}`
          )
        )
      );
      if (config.command === "build")
        startTime = dayjs(/* @__PURE__ */ new Date());
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(/* @__PURE__ */ new Date());
        recursiveDirectory(config.build.outDir, () => {
          console.log(
            bold(
              green(
                `\u606D\u559C\u6253\u5305\u5B8C\u6210\u{1F389}\uFF08\u603B\u7528\u65F6${dayjs.duration(endTime.diff(startTime)).format("mm\u5206ss\u79D2")}\uFF0C\u6253\u5305\u540E\u7684\u5927\u5C0F\u4E3A${formatBytes(
                  sum(fileListTotal)
                )}\uFF09`
              )
            )
          );
        });
      }
    }
  };
}

// plugins/index.ts
import legacy from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/@vitejs+plugin-legacy@5.4.3_terser@5.36.0_vite@5.4.10_@types+node@20.11.30_less@4.2.0_terser@5.36.0_/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import { visualizer } from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import AntdResolver from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/unplugin-auto-import-antd@0.0.2_@vueuse+core@10.11.1_vue@3.5.13_typescript@5.6.3__/node_modules/unplugin-auto-import-antd/dist/index.mjs";

// plugins/time.ts
var timePlugin = () => {
  return {
    name: "vite-build-time",
    enforce: "pre",
    apply: "build",
    buildStart: () => {
      console.time("\u6253\u5305\u65F6\u95F4");
    },
    buildEnd: () => {
    },
    // 在服务器关闭时被调用
    closeBundle: () => {
      console.timeEnd("\u6253\u5305\u65F6\u95F4");
    }
  };
};

// plugins/index.ts
import viteCompression from "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.4.10_@types+node@20.11.30_less@4.2.0_terser@5.36.0_/node_modules/vite-plugin-compression/dist/index.mjs";
function createVitePlugins(env) {
  const vitePluginList = [
    visualizer({
      // 可选配置项
      filename: "stats.html",
      // 输出文件名
      open: true,
      // 自动打开分析结果页面
      gzipSize: true,
      // 显示压缩后的大小
      brotliSize: true
      // 显示压缩后的大小
    }),
    AutoImport({
      imports: [
        "react",
        "react-router-dom",
        "react-i18next"
      ],
      resolvers: [AntdResolver()],
      dts: "types/auto-imports.d.ts",
      dirs: ["src/stores", "src/composables", "src/components"]
    }),
    Components({
      dts: true
    }),
    // https://github.com/kirklin/unplugin-config
    GenerateConfig({
      appName: env.VITE_GLOB_APP_TITLE,
      configFile: {
        generate: true,
        fileName: GLOB_CONFIG_FILE_NAME,
        outputDir: OUTPUT_DIR
      },
      envVariables: {
        prefix: "VITE_GLOB_"
      }
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ]
    }),
    viteBuildInfo(env.VITE_APP_NAME),
    // 兼容低版本
    legacy({
      targets: [
        "Android > 39",
        "Chrome >= 60",
        "Safari >= 10.1",
        "iOS >= 10.3",
        "Firefox >= 54",
        "Edge >= 15"
      ],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
    }),
    // 打包时间
    timePlugin(),
    // 压缩包
    viteCompression()
  ];
  return vitePluginList;
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/vite.config.ts";
var baseSrc = fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url));
var vite_config_default = ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const proxyObj = {};
  if (mode === "development" && env.VITE_APP_BASE_API_DEV && env.VITE_APP_BASE_URL_DEV) {
    proxyObj[env.VITE_APP_BASE_API_DEV] = {
      target: env.VITE_APP_BASE_URL_DEV,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API_DEV}`), "")
    };
  }
  return {
    plugins: createVitePlugins(env),
    chainWebpack: (config) => {
      config.plugin("webpack-bundle-analyzer").use(__require("file:///C:/Users/suzon/Desktop/project/react-project/react-ts-vite-app/node_modules/.pnpm/webpack-bundle-analyzer@4.10.2/node_modules/webpack-bundle-analyzer/lib/index.js").BundleAnalyzerPlugin);
    },
    resolve: {
      alias: [
        {
          find: "dayjs",
          replacement: "dayjs/esm"
        },
        {
          find: /^dayjs\/locale/,
          replacement: "dayjs/esm/locale"
        },
        {
          find: /^dayjs\/plugin/,
          replacement: "dayjs/esm/plugin"
        },
        {
          find: "lodash",
          replacement: "lodash-es"
        },
        {
          find: "~@",
          replacement: baseSrc
        },
        {
          find: "~",
          replacement: baseSrc
        },
        {
          find: "@",
          replacement: baseSrc
        },
        {
          find: "~#",
          replacement: resolve(baseSrc, "./enums")
        }
      ]
    },
    build: {
      chunkSizeWarningLimit: 4096,
      outDir: OUTPUT_DIR,
      rollupOptions: {
        output: {
          manualChunks: {}
        }
      }
    },
    server: {
      port: 6678,
      proxy: {
        ...proxyObj
        // [env.VITE_APP_BASE_API]: {
        //   target: env.VITE_APP_BASE_URL,
        // //   如果你是https接口，需要配置这个参数
        // //   secure: false,
        //   changeOrigin: true,
        //   rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        // },
      }
    },
    test: {
      globals: true,
      environment: "jsdom"
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGx1Z2lucy9pbmRleC50cyIsICJwbHVnaW5zL2NvbnN0YW50cy50cyIsICJwbHVnaW5zL3ZpdGUtYnVpbGQtaW5mby50cyIsICJwbHVnaW5zL3RpbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzdXpvblxcXFxEZXNrdG9wXFxcXHByb2plY3RcXFxccmVhY3QtcHJvamVjdFxcXFxyZWFjdC10cy12aXRlLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcc3V6b25cXFxcRGVza3RvcFxcXFxwcm9qZWN0XFxcXHJlYWN0LXByb2plY3RcXFxccmVhY3QtdHMtdml0ZS1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3N1em9uL0Rlc2t0b3AvcHJvamVjdC9yZWFjdC1wcm9qZWN0L3JlYWN0LXRzLXZpdGUtYXBwL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCAqIGFzIHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xuaW1wb3J0IHsgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdHlwZSB7IENvbmZpZ0VudiwgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBjcmVhdGVWaXRlUGx1Z2lucyB9IGZyb20gJy4vcGx1Z2lucydcbmltcG9ydCB7IE9VVFBVVF9ESVIgfSBmcm9tICcuL3BsdWdpbnMvY29uc3RhbnRzJ1xuXG5cblxuY29uc3QgYmFzZVNyYyA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUsIGNvbW1hbmQgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcbiAgY29uc3QgcHJveHlPYmogPSB7fVxuICBpZiAobW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJiBlbnYuVklURV9BUFBfQkFTRV9BUElfREVWICYmIGVudi5WSVRFX0FQUF9CQVNFX1VSTF9ERVYpIHtcbiAgICBwcm94eU9ialtlbnYuVklURV9BUFBfQkFTRV9BUElfREVWXSA9IHtcbiAgICAgIHRhcmdldDogZW52LlZJVEVfQVBQX0JBU0VfVVJMX0RFVixcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke2Vudi5WSVRFX0FQUF9CQVNFX0FQSV9ERVZ9YCksICcnKSxcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyhlbnYpLFxuICAgIGNoYWluV2VicGFjazogY29uZmlnID0+IHtcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1NTMwNVx1NTIwNlx1Njc5MFx1NTY2OFxuICAgICAgY29uZmlnLnBsdWdpbignd2VicGFjay1idW5kbGUtYW5hbHl6ZXInKVxuICAgICAgICAudXNlKHJlcXVpcmUoJ3dlYnBhY2stYnVuZGxlLWFuYWx5emVyJykuQnVuZGxlQW5hbHl6ZXJQbHVnaW4pXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ2RheWpzJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogJ2RheWpzL2VzbScsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvXmRheWpzXFwvbG9jYWxlLyxcbiAgICAgICAgICByZXBsYWNlbWVudDogJ2RheWpzL2VzbS9sb2NhbGUnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogL15kYXlqc1xcL3BsdWdpbi8sXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6ICdkYXlqcy9lc20vcGx1Z2luJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdsb2Rhc2gnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiAnbG9kYXNoLWVzJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICd+QCcsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGJhc2VTcmMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnficsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGJhc2VTcmMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IGJhc2VTcmMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnfiMnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKGJhc2VTcmMsICcuL2VudW1zJyksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNDA5NixcbiAgICAgIG91dERpcjogT1VUUFVUX0RJUixcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDY2NzgsXG4gICAgICBwcm94eToge1xuICAgICAgICAuLi5wcm94eU9iaixcbiAgICAgICAgLy8gW2Vudi5WSVRFX0FQUF9CQVNFX0FQSV06IHtcbiAgICAgICAgLy8gICB0YXJnZXQ6IGVudi5WSVRFX0FQUF9CQVNFX1VSTCxcbiAgICAgICAgLy8gLy8gICBcdTU5ODJcdTY3OUNcdTRGNjBcdTY2MkZodHRwc1x1NjNBNVx1NTNFM1x1RkYwQ1x1OTcwMFx1ODk4MVx1OTE0RFx1N0Y2RVx1OEZEOVx1NEUyQVx1NTNDMlx1NjU3MFxuICAgICAgICAvLyAvLyAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgIC8vICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAvLyAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke2Vudi5WSVRFX0FQUF9CQVNFX0FQSX1gKSwgJycpLFxuICAgICAgICAvLyB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHRlc3Q6IHtcbiAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICB9LFxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHN1em9uXFxcXERlc2t0b3BcXFxccHJvamVjdFxcXFxyZWFjdC1wcm9qZWN0XFxcXHJlYWN0LXRzLXZpdGUtYXBwXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHN1em9uXFxcXERlc2t0b3BcXFxccHJvamVjdFxcXFxyZWFjdC1wcm9qZWN0XFxcXHJlYWN0LXRzLXZpdGUtYXBwXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3N1em9uL0Rlc2t0b3AvcHJvamVjdC9yZWFjdC1wcm9qZWN0L3JlYWN0LXRzLXZpdGUtYXBwL3BsdWdpbnMvaW5kZXgudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBHZW5lcmF0ZUNvbmZpZyBmcm9tICd1bnBsdWdpbi1jb25maWcvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tcmVhY3QtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgeyBwcmVzZXRVbm8sIHByZXNldEF0dHJpYnV0aWZ5LCBwcmVzZXRJY29ucyB9IGZyb20gJ3Vub2Nzcyc7XHJcbmltcG9ydCB7IEdMT0JfQ09ORklHX0ZJTEVfTkFNRSwgT1VUUFVUX0RJUiB9IGZyb20gJy4vY29uc3RhbnRzJ1xyXG5pbXBvcnQgeyB2aXRlQnVpbGRJbmZvIH0gZnJvbSAnLi92aXRlLWJ1aWxkLWluZm8nXHJcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcclxuaW1wb3J0IEFudGRSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC1hbnRkJ1xyXG5pbXBvcnQgeyB0aW1lUGx1Z2luIH0gZnJvbSAnLi90aW1lJztcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlUGx1Z2lucyhlbnY6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcclxuXHJcbiAgY29uc3Qgdml0ZVBsdWdpbkxpc3Q6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9IFtcclxuICAgIHZpc3VhbGl6ZXIoe1xyXG4gICAgICAvLyBcdTUzRUZcdTkwMDlcdTkxNERcdTdGNkVcdTk4NzlcclxuICAgICAgZmlsZW5hbWU6ICdzdGF0cy5odG1sJywgLy8gXHU4RjkzXHU1MUZBXHU2NTg3XHU0RUY2XHU1NDBEXHJcbiAgICAgIG9wZW46IHRydWUsIC8vIFx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NTIwNlx1Njc5MFx1N0VEM1x1Njc5Q1x1OTg3NVx1OTc2MlxyXG4gICAgICBnemlwU2l6ZTogdHJ1ZSwgLy8gXHU2NjNFXHU3OTNBXHU1MzhCXHU3RjI5XHU1NDBFXHU3Njg0XHU1OTI3XHU1QzBGXHJcbiAgICAgIGJyb3RsaVNpemU6IHRydWUsIC8vIFx1NjYzRVx1NzkzQVx1NTM4Qlx1N0YyOVx1NTQwRVx1NzY4NFx1NTkyN1x1NUMwRlxyXG4gICAgfSksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICdyZWFjdCcsXHJcbiAgICAgICAgJ3JlYWN0LXJvdXRlci1kb20nLFxyXG4gICAgICAgICdyZWFjdC1pMThuZXh0JyxcclxuICAgICAgXSxcclxuICAgICAgcmVzb2x2ZXJzOiBbQW50ZFJlc29sdmVyKCldLFxyXG4gICAgICBkdHM6ICd0eXBlcy9hdXRvLWltcG9ydHMuZC50cycsXHJcbiAgICAgIGRpcnM6IFsnc3JjL3N0b3JlcycsICdzcmMvY29tcG9zYWJsZXMnLCAnc3JjL2NvbXBvbmVudHMnXSxcclxuICAgIH0pLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIGR0czogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2tpcmtsaW4vdW5wbHVnaW4tY29uZmlnXHJcbiAgICBHZW5lcmF0ZUNvbmZpZyh7XHJcbiAgICAgIGFwcE5hbWU6IGVudi5WSVRFX0dMT0JfQVBQX1RJVExFLFxyXG4gICAgICBjb25maWdGaWxlOiB7XHJcbiAgICAgICAgZ2VuZXJhdGU6IHRydWUsXHJcbiAgICAgICAgZmlsZU5hbWU6IEdMT0JfQ09ORklHX0ZJTEVfTkFNRSxcclxuICAgICAgICBvdXRwdXREaXI6IE9VVFBVVF9ESVIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVudlZhcmlhYmxlczoge1xyXG4gICAgICAgIHByZWZpeDogJ1ZJVEVfR0xPQl8nLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgICBVbm9jc3Moe1xyXG4gICAgICBwcmVzZXRzOiBbXHJcbiAgICAgICAgcHJlc2V0VW5vKCksXHJcbiAgICAgICAgcHJlc2V0QXR0cmlidXRpZnkoKSxcclxuICAgICAgICBwcmVzZXRJY29ucygpXHJcbiAgICAgIF1cclxuICAgIH0pLFxyXG4gICAgdml0ZUJ1aWxkSW5mbyhlbnYuVklURV9BUFBfTkFNRSksXHJcbiAgICAvLyBcdTUxN0NcdTVCQjlcdTRGNEVcdTcyNDhcdTY3MkNcclxuICAgIGxlZ2FjeSh7XHJcbiAgICAgIHRhcmdldHM6IFtcclxuICAgICAgICAnQW5kcm9pZCA+IDM5JyxcclxuICAgICAgICAnQ2hyb21lID49IDYwJyxcclxuICAgICAgICAnU2FmYXJpID49IDEwLjEnLFxyXG4gICAgICAgICdpT1MgPj0gMTAuMycsXHJcbiAgICAgICAgJ0ZpcmVmb3ggPj0gNTQnLFxyXG4gICAgICAgICdFZGdlID49IDE1JyxcclxuICAgICAgXSxcclxuICAgICAgYWRkaXRpb25hbExlZ2FjeVBvbHlmaWxsczogWydyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUnXSxcclxuICAgIH0pLFxyXG4gICAgLy8gXHU2MjUzXHU1MzA1XHU2NUY2XHU5NUY0XHJcbiAgICB0aW1lUGx1Z2luKCksXHJcbiAgICAvLyBcdTUzOEJcdTdGMjlcdTUzMDVcclxuICAgIHZpdGVDb21wcmVzc2lvbigpXHJcbiAgXVxyXG4gIHJldHVybiB2aXRlUGx1Z2luTGlzdFxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcc3V6b25cXFxcRGVza3RvcFxcXFxwcm9qZWN0XFxcXHJlYWN0LXByb2plY3RcXFxccmVhY3QtdHMtdml0ZS1hcHBcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcc3V6b25cXFxcRGVza3RvcFxcXFxwcm9qZWN0XFxcXHJlYWN0LXByb2plY3RcXFxccmVhY3QtdHMtdml0ZS1hcHBcXFxccGx1Z2luc1xcXFxjb25zdGFudHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3N1em9uL0Rlc2t0b3AvcHJvamVjdC9yZWFjdC1wcm9qZWN0L3JlYWN0LXRzLXZpdGUtYXBwL3BsdWdpbnMvY29uc3RhbnRzLnRzXCI7Ly8gVGhpcyBjb25zdGFudCBkZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBjb25maWd1cmF0aW9uIGZpbGUgdGhhdCB3aWxsIGJlIHVzZWQgaW4gdGhlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbmV4cG9ydCBjb25zdCBHTE9CX0NPTkZJR19GSUxFX05BTUUgPSAnX2FwcC5jb25maWcuanMnXG5cbi8vIFRoaXMgY29uc3RhbnQgc2V0cyB0aGUgb3V0cHV0IGRpcmVjdG9yeSBmb3IgdGhlIFZpdGUgcGFja2FnZVxuZXhwb3J0IGNvbnN0IE9VVFBVVF9ESVIgPSAnZGlzdCdcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcc3V6b25cXFxcRGVza3RvcFxcXFxwcm9qZWN0XFxcXHJlYWN0LXByb2plY3RcXFxccmVhY3QtdHMtdml0ZS1hcHBcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcc3V6b25cXFxcRGVza3RvcFxcXFxwcm9qZWN0XFxcXHJlYWN0LXByb2plY3RcXFxccmVhY3QtdHMtdml0ZS1hcHBcXFxccGx1Z2luc1xcXFx2aXRlLWJ1aWxkLWluZm8udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3N1em9uL0Rlc2t0b3AvcHJvamVjdC9yZWFjdC1wcm9qZWN0L3JlYWN0LXRzLXZpdGUtYXBwL3BsdWdpbnMvdml0ZS1idWlsZC1pbmZvLnRzXCI7aW1wb3J0IHsgcmVhZGRpciwgc3RhdCB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiwgUmVzb2x2ZWRDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IHR5cGUgeyBEYXlqcyB9IGZyb20gJ2RheWpzJ1xuaW1wb3J0IGR1cmF0aW9uIGZyb20gJ2RheWpzL3BsdWdpbi9kdXJhdGlvbidcbmltcG9ydCBwa2cgZnJvbSAncGljb2NvbG9ycydcblxuY29uc3QgeyBncmVlbiwgYmx1ZSwgYm9sZCB9ID0gcGtnXG5kYXlqcy5leHRlbmQoZHVyYXRpb24pXG5cbmNvbnN0IGZpbGVMaXN0VG90YWw6IG51bWJlcltdID0gW11cblxuZnVuY3Rpb24gcmVjdXJzaXZlRGlyZWN0b3J5KGZvbGRlcjogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgcmVhZGRpcihmb2xkZXIsIChlcnIsIGZpbGVzOiBzdHJpbmdbXSkgPT4ge1xuICAgIGlmIChlcnIpXG4gICAgICB0aHJvdyBlcnJcbiAgICBsZXQgY291bnQgPSAwXG4gICAgY29uc3QgY2hlY2tFbmQgPSAoKSA9PiB7XG4gICAgICArK2NvdW50ID09PSBmaWxlcy5sZW5ndGggJiYgY2FsbGJhY2soKVxuICAgIH1cbiAgICBmaWxlcy5mb3JFYWNoKChpdGVtOiBzdHJpbmcpID0+IHtcbiAgICAgIHN0YXQoYCR7Zm9sZGVyfS8ke2l0ZW19YCwgYXN5bmMgKGVyciwgc3RhdHMpID0+IHtcbiAgICAgICAgaWYgKGVycilcbiAgICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgaWYgKHN0YXRzLmlzRmlsZSgpKSB7XG4gICAgICAgICAgZmlsZUxpc3RUb3RhbC5wdXNoKHN0YXRzLnNpemUpXG4gICAgICAgICAgY2hlY2tFbmQoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICByZWN1cnNpdmVEaXJlY3RvcnkoYCR7Zm9sZGVyfS8ke2l0ZW19L2AsIGNoZWNrRW5kKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gICAgZmlsZXMubGVuZ3RoID09PSAwICYmIGNhbGxiYWNrKClcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3VtKGFycjogbnVtYmVyW10pIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoKHQ6IG51bWJlciwgYzogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIHQgKyBjXG4gIH0sIDApXG59XG5mdW5jdGlvbiBmb3JtYXRCeXRlcyhhOiBudW1iZXIsIGI/OiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAoYSA9PT0gMClcbiAgICByZXR1cm4gJzAgQnl0ZXMnXG4gIGNvbnN0IGMgPSAxMDI0XG4gIGNvbnN0IGQgPSBiIHx8IDJcbiAgY29uc3QgZSA9IFsnQnl0ZXMnLCAnS0InLCAnTUInLCAnR0InLCAnVEInLCAnUEInLCAnRUInLCAnWkInLCAnWUInXVxuICBjb25zdCBmID0gTWF0aC5mbG9vcihNYXRoLmxvZyhhKSAvIE1hdGgubG9nKGMpKVxuICByZXR1cm4gYCR7TnVtYmVyLnBhcnNlRmxvYXQoKGEgLyBjICoqIGYpLnRvRml4ZWQoZCkpfSAke2VbZl19YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdml0ZUJ1aWxkSW5mbyhuYW1lOiBzdHJpbmcpOiBQbHVnaW4ge1xuICBsZXQgY29uZmlnOiBSZXNvbHZlZENvbmZpZ1xuICBsZXQgc3RhcnRUaW1lOiBEYXlqc1xuICBsZXQgZW5kVGltZTogRGF5anNcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndml0ZTpidWlsZEluZm8nLFxuICAgIGNvbmZpZ1Jlc29sdmVkKHJlc29sdmVkQ29uZmlnKSB7XG4gICAgICBjb25maWcgPSByZXNvbHZlZENvbmZpZ1xuICAgIH0sXG4gICAgYnVpbGRTdGFydCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBib2xkKFxuICAgICAgICAgIGdyZWVuKFxuICAgICAgICAgICAgYFx1RDgzRFx1REM0Rlx1NkIyMlx1OEZDRVx1NEY3Rlx1NzUyOCR7Ymx1ZShgWyR7bmFtZX1dYCl9XHVGRjBDXHU3M0IwXHU1NzI4XHU2QjYzXHU1MTY4XHU1MjlCXHU0RTNBXHU2MEE4JHtjb25maWcuY29tbWFuZCA9PT0gJ2J1aWxkJyA/ICdcdTYyNTNcdTUzMDUnIDogJ1x1N0YxNlx1OEJEMSdcbiAgICAgICAgICAgIH1gLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgICApXG4gICAgICBpZiAoY29uZmlnLmNvbW1hbmQgPT09ICdidWlsZCcpXG4gICAgICAgIHN0YXJ0VGltZSA9IGRheWpzKG5ldyBEYXRlKCkpXG4gICAgfSxcbiAgICBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgIGlmIChjb25maWcuY29tbWFuZCA9PT0gJ2J1aWxkJykge1xuICAgICAgICBlbmRUaW1lID0gZGF5anMobmV3IERhdGUoKSlcbiAgICAgICAgcmVjdXJzaXZlRGlyZWN0b3J5KGNvbmZpZy5idWlsZC5vdXREaXIsICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGJvbGQoXG4gICAgICAgICAgICAgIGdyZWVuKFxuICAgICAgICAgICAgICAgIGBcdTYwNkRcdTU1OUNcdTYyNTNcdTUzMDVcdTVCOENcdTYyMTBcdUQ4M0NcdURGODlcdUZGMDhcdTYwM0JcdTc1MjhcdTY1RjYke2RheWpzXG4gICAgICAgICAgICAgICAgICAuZHVyYXRpb24oZW5kVGltZS5kaWZmKHN0YXJ0VGltZSkpXG4gICAgICAgICAgICAgICAgICAuZm9ybWF0KCdtbVx1NTIwNnNzXHU3OUQyJyl9XHVGRjBDXHU2MjUzXHU1MzA1XHU1NDBFXHU3Njg0XHU1OTI3XHU1QzBGXHU0RTNBJHtmb3JtYXRCeXRlcyhcbiAgICAgICAgICAgICAgICAgICAgc3VtKGZpbGVMaXN0VG90YWwpLFxuICAgICAgICAgICAgICAgICAgKX1cdUZGMDlgLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzdXpvblxcXFxEZXNrdG9wXFxcXHByb2plY3RcXFxccmVhY3QtcHJvamVjdFxcXFxyZWFjdC10cy12aXRlLWFwcFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzdXpvblxcXFxEZXNrdG9wXFxcXHByb2plY3RcXFxccmVhY3QtcHJvamVjdFxcXFxyZWFjdC10cy12aXRlLWFwcFxcXFxwbHVnaW5zXFxcXHRpbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3N1em9uL0Rlc2t0b3AvcHJvamVjdC9yZWFjdC1wcm9qZWN0L3JlYWN0LXRzLXZpdGUtYXBwL3BsdWdpbnMvdGltZS50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XHJcblxyXG4vKipcclxuICogXHU2NjNFXHU3OTNBXHU2MjUzXHU1MzA1XHU2NUY2XHU5NUY0XHU2M0QyXHU0RUY2XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGltZVBsdWdpbiA9ICgpOiBQbHVnaW5PcHRpb24gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAndml0ZS1idWlsZC10aW1lJyxcclxuICAgIGVuZm9yY2U6ICdwcmUnLFxyXG4gICAgYXBwbHk6ICdidWlsZCcsXHJcbiAgICBidWlsZFN0YXJ0OiAoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUudGltZSgnXHU2MjUzXHU1MzA1XHU2NUY2XHU5NUY0Jyk7XHJcbiAgICB9LFxyXG4gICAgYnVpbGRFbmQ6ICgpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLnRpbWVFbmQoJ1xcblx1NkEyMVx1NTc1N1x1OEY2Q1x1NEU0OVx1NUI4Q1x1NjIxMFx1NjVGNlx1OTVGNCcpXHJcbiAgICB9LFxyXG4gICAgLy8gXHU1NzI4XHU2NzBEXHU1MkExXHU1NjY4XHU1MTczXHU5NUVEXHU2NUY2XHU4OEFCXHU4QzAzXHU3NTI4XHJcbiAgICBjbG9zZUJ1bmRsZTogKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUudGltZUVuZCgnXHU2MjUzXHU1MzA1XHU2NUY2XHU5NUY0Jyk7XHJcbiAgICB9XHJcbiAgfTtcclxufTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7OztBQUNBLFNBQVMsZUFBZTtBQUN4QixTQUFTLHFCQUFxQjtBQUM5QixZQUFZLGFBQWE7QUFDekIsU0FBUyxlQUFlOzs7QUNIeEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsV0FBVyxtQkFBbUIsbUJBQW1COzs7QUNKbkQsSUFBTSx3QkFBd0I7QUFHOUIsSUFBTSxhQUFhOzs7QUNKa1ksU0FBUyxTQUFTLFlBQVk7QUFFMWIsT0FBTyxXQUFXO0FBRWxCLE9BQU8sY0FBYztBQUNyQixPQUFPLFNBQVM7QUFFaEIsSUFBTSxFQUFFLE9BQU8sTUFBTSxLQUFLLElBQUk7QUFDOUIsTUFBTSxPQUFPLFFBQVE7QUFFckIsSUFBTSxnQkFBMEIsQ0FBQztBQUVqQyxTQUFTLG1CQUFtQixRQUFnQixVQUEwQjtBQUNwRSxVQUFRLFFBQVEsQ0FBQyxLQUFLLFVBQW9CO0FBQ3hDLFFBQUk7QUFDRixZQUFNO0FBQ1IsUUFBSSxRQUFRO0FBQ1osVUFBTSxXQUFXLE1BQU07QUFDckIsUUFBRSxVQUFVLE1BQU0sVUFBVSxTQUFTO0FBQUEsSUFDdkM7QUFDQSxVQUFNLFFBQVEsQ0FBQyxTQUFp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
