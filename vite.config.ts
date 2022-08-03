import type { UserConfigExport, ConfigEnv } from 'vite'
import { loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from "vite-plugin-imp";
import { viteMockServe } from 'vite-plugin-mock';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import { getAliases } from "vite-aliases";
import styleImport from 'vite-plugin-style-import';

const projectName = 'vrAdmin';
const aliases = getAliases();

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default ({ command, mode } : { command: string, mode: string}) => {
  const isProduction = mode === 'production';
  console.log('command:')
  return {
    base: isProduction ? '/' : `/${projectName}/`,
    resolve: {
      // alias: aliases,
      alias: [
        {
          // /@/xxxx  =>  src/xxx
          find: /^~/,
          replacement: pathResolve('node_modules') + '/',
        },
        {
          // /@/xxxx  =>  src/xxx
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    optimizeDeps: {
      include: [
        '@ant-design/colors',
        '@ant-design/icons',
        // '@ant-design/pro-card',
      ],
    },
    plugins: [
      reactRefresh(),
      svgr(),
      // viteMockServe({
      //   mockPath: 'mock',
      //   supportTs: true,
      //   watchFiles: true,
      //   localEnabled: command === 'serve',
      //   logger: true,
      // }),
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
      // styleImport({
      //   libs: [
      //     {
      //       libraryName: 'antd',
      //       esModule: true,
      //       resolveStyle: (name) => {
      //         return `antd/es/${name}/style/index`;
      //       },
      //     },
      //   ],
      // }),
    ],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#1890ff',
          },
        },
      },
    },
    server: {
      host: true,
      port: 10016,
      strictPort: true,
      proxy: {
        '/mock': {
          target: 'http://1.13.20.201:9090/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/mock/, '')
        }
      },
    },
   
    build: {
      outDir: `output/${projectName}`,
      minify: isProduction
    },
  }
}

