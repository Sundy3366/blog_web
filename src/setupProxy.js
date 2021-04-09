/*
* 本地添加graphql代理配置
* */
const proxy = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		['/user', '/article','/upload'],
		proxy({
			target: process.env.NODE_ENV === 'development' && "http://localhost:8989",
			secure: false,
            changeOrigin: true,
			logLevel: "debug"
		})
	);
};

// https://cdss-dev.skymed.ai:7443
