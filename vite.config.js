import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import viteBanner from 'vite-plugin-banner';
import { createHtmlPlugin } from 'vite-plugin-html';
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
const outputFolder = 'dist'; // Specify the output directory (relative to project root).
const assetsFolder = 'assets'; // Specify the assets folder (relative to project root).
const publicPath = process.env.BRANCH === 'gh-pages' ? '/Car-Service/' : '/' // The name of the Github repository
process.env = { ...process.env, VITE_APP_HOST_URL: publicPath.slice(0, -1) };

export default defineConfig({
  base: publicPath,
  assetsInclude: assetsFolder,
  server: {
    open: true,
    host: true,
  },
  build: {
    outDir: outputFolder,
    assetsDir: assetsFolder,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        dir: outputFolder,
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
        assetFileNames: ({ name = '' }) => {
          if (/\\favicon\\/.test(name)) return `${assetsFolder}/images/favicon/[name][extname]`;
          if (/\.css/.test(name)) return `${assetsFolder}/styles/[name][extname]`;
          if (/\.(woff2?|ttf|otf)$/.test(name)) return `${assetsFolder}/fonts/[name][extname]`;
          if (/\.(png|jpe?g|svg)$/.test(name)) return `${assetsFolder}/images/[name][extname]`;
          if (/\.(json)$/.test(name)) return `${assetsFolder}/json/[name][extname]`;
          return '[name][extname]';
        }
      }
    }
  },
  plugins: [
    viteStaticCopy({ targets: [{ src: `${assetsFolder}/images`, dest: assetsFolder }] }),
    viteBanner({ outDir: outputFolder, content: banner }),
    createHtmlPlugin({ minify: true, inject: { data: { APP_HOST_URL: process.env.VITE_APP_HOST_URL } } }),
    {
      name: 'squash-template-literals',
      transform: (code, id) => {
        if (id.includes('/src/templates/')) return code.replace(/\s*\n\s*/g, '');
        return code;
      },
    }
  ]
});