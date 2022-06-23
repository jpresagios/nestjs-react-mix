const CracoLessPlugin = require('craco-less');
const cracoAlias = require('craco-alias');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...getThemeVariables({
                dark: false,
                compact: true,
              }),
              'primary-color': '#6579FF',
              'root-entry-name': 'default',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  resolve: {
    fallback: { util: false },
  },
  webpack: {
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        const instanceOfMiniCssExtractPlugin = webpackConfig.plugins.find(
          (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
        );
        if (instanceOfMiniCssExtractPlugin) {
          instanceOfMiniCssExtractPlugin.options.ignoreOrder = true;
        }
      }
      const { resolve } = webpackConfig;
      resolve.fallback = { util: false };

      return webpackConfig;
    },
  },
};
