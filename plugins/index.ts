import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import GenerateConfig from 'unplugin-config/vite'
import Components from 'unplugin-react-components/vite'
import Unocss from 'unocss/vite'
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from './constants'
import { viteBuildInfo } from './vite-build-info'
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer';
import { AntdResolver } from 'unplugin-react-components'
export function createVitePlugins(env: Record<string, string>) {
  const vitePluginList: (PluginOption | PluginOption[])[] = [
    visualizer({
      // 可选配置项
      filename: 'stats.html', // 输出文件名
      open: true, // 自动打开分析结果页面
      gzipSize: true, // 显示压缩后的大小
      brotliSize: true, // 显示压缩后的大小
    }),
    AutoImport({

      dts: 'types/auto-imports.d.ts',
      dirs: ['src/stores', 'src/composables'],
    }),
    Components({
      resolvers: [AntdResolver()],
      dts: true,
    }),
    // https://github.com/kirklin/unplugin-config
    GenerateConfig({
      appName: env.VITE_GLOB_APP_TITLE,
      configFile: {
        generate: true,
        fileName: GLOB_CONFIG_FILE_NAME,
        outputDir: OUTPUT_DIR,
      },
      envVariables: {
        prefix: 'VITE_GLOB_',
      },
    }),
    Unocss(),
    viteBuildInfo(env.VITE_APP_NAME),
    legacy()
  ]
  return vitePluginList
}
