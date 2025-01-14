import glob from 'glob';
import path from 'path';
import fs from 'fs';

export default function uploadSourceMapPlugin() {
    let config;
    return {
        name: 'vite-plugin-upload-source-map',
        configResolved(resolvedConfig) {
            config = resolvedConfig; // 存储配置
        },
        apply: 'build',
        async writeBundle() {
            if (!config) {
                return;
            }
            const outDir = config.build?.outDir || 'dist';
            const buildDir = path.join(config.root, outDir);
            const dirPath = path.join(config.root, 'server', 'mapjs');
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }
            const list = glob.sync(path.join(buildDir, '**/*.js.map'));
            for (const item of list) {
                const fileName = path.basename(item);
                const targetPath = path.join(dirPath, fileName);
                fs.rename(item, targetPath, (err) => {
                    if (err) {
                        console.error('文件移动失败:', err);
                    }
                });
            }
        },
    };
}
