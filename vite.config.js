import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import viteBanner from 'vite-plugin-banner';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from './package.json';

const banner = `
/**
 * @name ${pkg.name}
 * @description ${pkg.description}
 *
 * @version ${pkg.version}
 * @author ${pkg.author}
 * @license ${pkg.license}
 */
`.trim();
const root = '.'; /* Project root directory (where index.html is located). */
const outputFolder = 'dist'; /* Specify the output directory (relative to project root). */
const assetFolder = 'assets'; /* Referenced in source code. They are hashed. */
const publicFolder = `${assetFolder}/public`; /* Referenced in source code. They are not hashed. */
const main = pkg.main || 'index.html'; /* Which file watcher to open. */
const pluginSettings = {
  viteStaticCopy: { targets: [{ src: publicFolder, dest: assetFolder }] },
  viteBanner: { outDir: outputFolder, content: banner },
  createHtmlPlugin: { minify: true, filename: `${main}` },
  visualizer: { filename: 'chart.html', title: 'App Visualizer', template: 'treemap', gzipSize: true, brotliSize: true },
};

export default defineConfig({
  root,
  server: {
    // Development
    cors: true,
    open: true,
  },
  build: {
    // Production
    outDir: outputFolder,
    assetsDir: assetFolder,
    assetsInlineLimit: 0,
    target: 'modules',
    open: `${outputFolder}/${main}`,
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    manifest: false,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        dir: outputFolder,
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: '[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? '')) return `${assetFolder}/styles/[name]-[hash][extname]`;
          return '[name]-[hash][extname]';
        }
      }
    }
  },
  plugins: [
    viteStaticCopy(pluginSettings.viteStaticCopy),
    viteBanner(pluginSettings.viteBanner),
    createHtmlPlugin(pluginSettings.createHtmlPlugin),
    visualizer(pluginSettings.visualizer),
  ],
});