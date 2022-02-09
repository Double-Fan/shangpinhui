module.exports = {
	// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	productionSourceMap: false,
	// 关闭lint语法检查
	lintOnSave: false,
	// 开启代理
	devServer: {
		proxy: {
			"/api": {
				target: "http://39.98.123.211"
			}
		}
	}
};
