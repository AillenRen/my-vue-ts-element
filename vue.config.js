const path = require("path");
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const projectConfig = {
  appname: "网站名称",
  keyWords: "", // 关键字
  description: "" // 描述
};
// 搜索目录
const aliases = {
  "@": "src",
  "@config": "src/util/config.ts",
  "@components": "src/components",
  "@util": "src/util",
  "@service": "src/service"
};

// 设置搜索
function getResolveAlias() {
  let aliasObj = {};
  for (const alias in aliases) {
    aliasObj[alias] = resolve(aliases[alias]);
  }
  return aliasObj;
}
// scss 设置全局变量
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/style/global.scss")]
    });
}

module.exports = {
  // 选项...
  configureWebpack: config => {
    // 配置搜索路径
    config.resolve.alias = getResolveAlias();
    if (process.env.NODE_ENV === "production") {
      // 生产环境对文件进行压缩
      config.optimization.minimize = true;
    }
  },
  chainWebpack: config => {
    // 查看打包后每个文件大小的插件
    // config.plugin('webpack-bundle-analyzer')
    //         .use(BundleAnalyzerPlugin)
    //         .init(Plugin => new Plugin())
    //         .end();
    // 设置10kb以下的图片转化成base64格式
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options =>
        Object.assign(options, {
          limit: 10240
        })
      )
      .end();
    // 设置生产环境index.html中的部分值问题
    config
      .plugin("html")
      .tap(args => {
        args[0].title = projectConfig.appname; // 网站标题
        args[0].keyWords = projectConfig.keyWords || projectConfig.appname; // 网站关键字
        args[0].description =
          projectConfig.description || projectConfig.appname; // 网站描述
        return args;
      })
      .end();
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  },
  devServer: {
    // port: 80,
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave: false
};
