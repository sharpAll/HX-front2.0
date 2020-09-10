module.exports = {
  outputDir: "HX-front2.0",
  devServer: {
    port: 8080,
    host: "localhost",
    https: false,
    open: true //启动服务时自动打开浏览器访问
  },
  lintOnSave: false, // 关闭格式检查
  productionSourceMap: false // 打包时不会生成 .map 文件，加快打包速度
};
