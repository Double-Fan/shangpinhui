// axios 二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

let requests = axios.create({
	baseURL: "/api",
	timeout: 5000
});

// 请求拦截器
requests.interceptors.request.use(
	(config) => {
		if (store.state.detail.uuid_token) {
			// 请求头添加一个字段（userTempId）：和后台商量好了
			config.headers.userTempId = store.state.detail.uuid_token;
		}
		// 用户登录 token
		if (store.state.user.token) {
			config.headers.token = store.state.user.token;
		}
		// 进度条开始
		nprogress.start();
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
requests.interceptors.response.use(
	(response) => {
		// 进度条结束
		nprogress.done();
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default requests;
