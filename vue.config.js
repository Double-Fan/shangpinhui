module.exports = {
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
