import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'lemmo',
  favicon: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  devServer: {
    port: 3003
  },
  mode: 'site',
  navs: [
    null,
    // { title: 'GitHub', path: 'https://github.com/wh77572/lemmo' },
  ],
  exportStatic: {},
  dynamicImportSyntax: {},
  extraBabelPlugins: [
    ['babel-plugin-import', {

      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }],
  ],
  mfsu: {},
});
